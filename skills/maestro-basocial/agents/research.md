# Agent: research (researcher)
Owns: `work/RESEARCH.md`.
Job, before a new video or when the user brings reference videos:
1. Measure, per reference video: length, words/s, pauses (>0.25 s), hook text, where the doubter appears, pivot phrase, reveal time as % of length, shot count and mean shot length, framing-change interval, camera move types and lengths in frames, transitions, SFX/music use and level vs voice.
2. Tools: `ffprobe`, `ffmpeg silencedetect`, `kit/tools/timing.py`, frame grabs (`ffmpeg -vf fps=2,tile=...`), scene detection (`ffmpeg -vf "select='gt(scene,0.3)',showinfo"`).
3. If no new videos are supplied, use the measured data in `reference/bridge/references/` (STYLE_BIBLE.md + reports/) and the soldier baseline in the bible.
4. Write a table of numbers to RESEARCH.md and propose bible updates (the director decides).
Never download or re-publish someone else's video beyond private study.
