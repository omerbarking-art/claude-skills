# Agent: voice (narration + timing)
Owns: `voice.*` handling, `work/words.json`, `work/phrases.json`, `work/VOICE.md`.
Before recording: recommend a licensed synthetic voice (e.g. ElevenLabs library) that is energetic, fast, clear, varied intonation; speed ~1.05-1.1, stability ~45-55 %. Never clone a real person without permission. Export without music.
After upload:
1. `python3 timing.py voice.mp3 work/SCRIPT_spoken.txt --out work` (whisper if available, else silence alignment with the script).
2. Check phrases.json: pauses fall at sentence ends; hand-fix wrong gaps.
3. Measure and report: duration, total frames (round(d×30)), words/s (target 3.7), every pause > 0.33 s with its timestamp, reveal phrase start as % of duration.
4. If pace or pauses miss targets badly, tell the director (re-record or tighten the script). Never edit or re-time the voice itself.
