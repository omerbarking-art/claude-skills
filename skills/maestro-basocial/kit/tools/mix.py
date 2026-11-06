#!/usr/bin/env python3
"""Level-locked mix:  python3 mix.py voice.mp3 music.wav sfx.wav [--frames N]
Music bed = 50 % of the voice's gated RMS (-6 dB). SFX = 50 % or less, peaks capped at 0.7x the voice peak.
No ducking, no compression. Writes mix_raw.wav (48 kHz mono). finish.sh then applies one linear gain + a peak limiter."""
import sys, subprocess, wave, numpy as np
SR = 48000
def load(p):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).astype(np.float64)
def grms(x, blk=int(0.05 * SR)):  # RMS over 50 ms blocks louder than -30 dB of the loudest block
    n = len(x) // blk
    if n == 0: return 0.0
    r = np.sqrt((x[:n * blk].reshape(n, blk) ** 2).mean(1)); g = r[r > r.max() * 0.0316]
    return float(np.sqrt((g ** 2).mean())) if len(g) else 0.0
db = lambda a: 20 * np.log10(max(a, 1e-9))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
v, mu, sf = (load(p) for p in args[:3])
N = int(round(int(sys.argv[sys.argv.index("--frames") + 1]) / 30 * SR)) if "--frames" in sys.argv else len(v)
fit = lambda x: np.pad(x, (0, max(0, N - len(x))))[:N]
v, mu, sf = fit(v), fit(mu), fit(sf)
rv, vp = grms(v), np.abs(v).max()
gm = 0.5 * rv / grms(mu) if grms(mu) else 0.0
gs = 0.5 * rv / grms(sf) if grms(sf) else 0.0
if gs and np.abs(sf).max() * gs > 0.7 * vp: gs = 0.7 * vp / np.abs(sf).max()
mix = v + mu * gm + sf * gs
pk = np.abs(mix).max(); g = 0.98 / pk if pk > 0.98 else 1.0  # one linear gain, only to avoid clipping
mix *= g
with wave.open("mix_raw.wav", "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix, -1, 1) * 32767).astype(np.int16).tobytes())
print(f"length {N / SR:.2f}s | music vs voice {db(grms(mu * gm)) - db(rv):+.1f} dB | sfx vs voice {db(grms(sf * gs)) - db(rv):+.1f} dB"
      f" | sfx peak {np.abs(sf * gs).max() / vp:.2f}x voice peak | safety gain {db(g):+.1f} dB")
