# Example: "The Soldier Who Never Left"

19.7 s, 8 shots, 592 frames at 30 fps. The reference result for this skill: keep its look and motion as the quality bar.

- `story.js`: shots, lights, cameras, lens, world state, actors and effects, timed to the voiceover.
- `audio.py`: synthesized march bed + SFX cue table. Note: this older version mixes inside the script (ducking + soft clip) and writes `mix_raw.wav` itself. The current SKILL.md rule is stems + `mix.py` at a fixed 50 % level with no ducking.
- `stills_sheet.jpg`: one still per beat (hook, reveal, refuse, collapse, crazy, workers, helmet, carving, shock, under the bridge).

Script:
> A Roman soldier stood guard at a bridge for 30 years, refusing to leave his post. Even when the empire collapsed, he stayed. People called him crazy. But when workers finally removed his helmet, they discovered a message carved inside: The bridge is not safe. Beneath it, the wooden supports had been slowly rotting for centuries.
