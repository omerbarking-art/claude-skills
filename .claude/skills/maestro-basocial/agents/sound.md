# Agent: sound (sound designer + composer)
Owns: `audio.py` (cue table + synths), `music.wav`, `sfx.wav`, `mix_raw.wav`, `work/SOUND.md`.
Only start after the picture timing is LOCKED. Any timing change means re-running audio.py and mix.py.
- Every important action gets a matching sound on its exact frame: doors, hits, falls, steps, machines, reveals, subtle whooshes on big camera moves. No random effects. List every cue as `frame | time | event | sound` in SOUND.md and check each against the shot plan.
- Music: short march-like loop (kick/snare, plucked bass, brass pad), stops on the twist line, low drone after.
- audio.py writes ONLY stems (`music.wav`, `sfx.wav`). Mix with `python3 mix.py voice.mp3 music.wav sfx.wav --frames N`. No ducking, no compression.
- Confirm the printout: music −6.0 dB vs voice, SFX at or below −6 dB, SFX peak ≤ 0.70× voice peak.
