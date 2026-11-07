# Production Bible (permanent rules for every short)

Source: the owner's production brief (2026-11-06). Read this before Stage 1 of every video. These rules apply on top of SKILL.md.
Where a target has a number, measure it and fill the QA table at the end. Never call a video done on impression alone.

## 0. How to work
Work as a full production team: director, writer, story expert, character designer, 3D animator, cinematographer, editor, sound designer, QA critic.
Before finishing any video, criticise your own work, find the weak points, fix them, and check again. Never hide a problem. Never say "ready" while a known issue remains.
Quality before speed. Never skip QA. Never settle for the first result.

## 1. Research before a new video
1. Analyse successful videos in the topic area (when the user supplies them, or from `references/` of cartoon-3d-short).
2. How the story is built (beats, where the doubter appears, where the pivot is).
3. Narration pace in words/s and pause lengths.
4. Camera moves (type, length in frames, speed).
5. Character motion.
6. Length of every scene.
7. Transitions between scenes.
8. SFX and music use.
9. When the main reveal happens (% of the length).
10. Write the numbers into this bible or a per-video `work/RESEARCH.md`. Numbers, frames and data, not adjectives.

## 2. Story
- Sentence 1 is a very strong hook in the first second: a strange situation, a problem, an unexpected act or a mystery.
- The viewer must want to understand what is going on.
- Include a character who doubts or doesn't believe.
- Tension builds step by step.
- A pivot phrase: "But here's what you need to understand..." / "You see,".
- The main explanation comes late, after curiosity is built. Never reveal the answer early.
- End on a satisfying, surprising reveal.
- **Reveal at ~70 % of the length** (measured average). A guideline to check per story, not a hard law.

## 3. Narration
- Fast, clear, energetic, continuous.
- **Target ~3.7 words/s.**
- **Pauses usually < 0.33 s**, unless there is a dramatic reason.
- Never hurt understanding for speed.
- Voice: energetic, fast, clear, with presence and varied intonation, fits a dramatic story. A synthetic voice from a licensed library is fine. **Never clone a real person's voice without permission**: find a voice with similar pace, pitch, energy and intonation. Listen and pick the best one.

## 4. Characters and look
- Simple, clean, minimal stick-figure characters, ~3 heads tall, ball hands with no detailed fingers.
- Outline in dark plum, never pure black.
- Quality lighting, clear shading, real depth, detailed environments, cinematic.
- Every character stays consistent: body build, head size, proportions, colours, outfit, props, animation style. No random change between frames or scenes.
- NOTE: the owner's brief asks for "stickman in real 3D". The current engine draws characters as flat 2D cards in a 3D world (the look of the soldier example). Confirm with the owner before switching to true 3D characters.

## 5. Camera (one of the most important rules)
- The camera is in almost constant motion. No static camera without a reason.
- **Change angle or framing about every 1.7 s.**
- Smooth moves: push in, pull out, pan, tracking, dolly, and complex combinations when useful.
- Continuous motion between scenes. The camera never stops between moves and never feels like it brakes and restarts at a transition.
- Build on curved continuous camera paths (`path` via-points / Catmull-Rom in motion.js).
- Flow between places through openings, doors, windows, corridors, portals.
- **Measure camera speed at every frame and confirm there are no unwanted stops.**

## 6. Character and object animation
Check every character and every object through the whole video. Not allowed:
- characters passing through each other, walls or furniture;
- heads poking through windows illogically;
- characters vanishing suddenly or changing shape;
- limbs detaching from the body;
- objects passing through characters;
- unnatural collisions, involuntary moves, illogical object rotations.
All motion must be physically plausible. Check single frames AND frame sequences.

## 7. Light, textures, environment
- Cinematic light, clear separation of characters from background, sharp outlines, good contrast, natural shadows, depth between objects.
- Rich but not cluttered environments. High sharpness, no unwanted blur (planned DOF on close-ups is allowed).
- No dark areas that hide the action. Light comes from logical directions. No ceiling or object blocking the light in a way that hurts the shot.

## 8. Sound and music
- Every important action gets a matching sound: door → open sound, hammer → exact hit, fall → impact, walking → steps, machine → mechanism, surprise → sting, camera move → subtle whoosh when needed.
- **Each SFX on the exact frame of its action.** No random effects.
- Music supports the story and never covers the narration (SKILL.md: music and SFX at 50 % of the voice level).

## 9. Build in stages (never a whole video without checks)
1. Research: topic, fact check, analysis of successful stories, style.
2. Script: strong hook, tension, development, planned reveal, satisfying end.
3. Storyboard: scenes, every shot, actions, camera moves, transitions (`work/PLAN.md`).
4. Characters and environments: consistent characters, props, 3D sets, light test.
5. Animation: characters, objects, camera paths, transitions.
6. Voice and sound: narration, timing, SFX, music.
7. QA: watch everything, find faults, log their timestamps, fix every one, make a new version.
8. Final check: start to end, image quality, A/V sync, pace, camera motion, character consistency.

## 10. Fix method (mandatory)
Work with timestamps, never vague notes. Log format:
`00:10 – two characters pass through each other` / `00:13 – a character vanishes during the camera move` / `01:05 – the camera stops unnaturally`.
For each note: render the frames around it, find the cause, fix it in code, re-render, and check nothing new broke.
Keep the log in `work/FIXES.md` (timestamp, frame, fault, cause, fix, verified).

## 11. QA table (fill for every version; compare with the targets)
| Check | Target | How to measure |
|---|---|---|
| Narration pace | ~3.7 words/s | words ÷ voice duration (timing.py) |
| Pauses | most < 0.33 s | gaps in work/phrases.json |
| Reveal position | ~70 % | reveal phrase start ÷ duration |
| Framing change | every ~1.7 s | count shot starts + camera key moves ÷ duration |
| Camera never stops | no hold ≥ 4 f without creep; no speed drop to 0 between moves | camera speed per frame from camAt() |
| Scene lengths | listed per shot | SHOTS a/b |
| Transitions | continuous move, flash only on time jumps | PLAN.md vs render |
| SFX sync | 0-3 f before / on the action frame | cue table vs action frames |
| Music level | 50 % of voice (−6 dB) | mix.py print-out |
| Character consistency | same build, colours, outfit in every shot | stills contact sheet |
| Collisions / pass-through | zero | frame-by-frame review of each shot |
| Light | no hidden action, no blocked light | stills sheet |
| Frozen / black frames | none (freeze ≥ 0.4 s, black) | finish.sh QA |
| Loudness | −14 LUFS | finish.sh QA |

## 12. Baseline: the soldier example measured (2026-11-06)
| Check | Soldier | Target | Note |
|---|---|---|---|
| Pace | 56 words / 19.72 s = **2.84 words/s** | 3.7 | slower than target |
| Mean pause | **0.47 s** (0.20-0.79) | < 0.33 | longer than target |
| Reveal ("The bridge is not safe") | **72 %** | ~70 % | on target |
| Shots | 8, mean **2.47 s** (0.9-3.63 s) | — | |
| Framing changes | ~12 (8 shots + mid-shot moves) ≈ every **1.6 s** | ~1.7 s | on target |
New videos should keep the soldier's look and reveal timing, and tighten the narration pace and pauses.

## 13. Fixed rules that must never be ignored
1. Quality before speed. 2. Never skip QA. 3. Never settle for the first result. 4. Never leave known faults.
5. No characters passing through objects. 6. No camera stopping without reason. 7. No unsynced sound.
8. No change of character design between scenes. 9. Keep a fast, interesting pace. 10. Build curiosity before the answer.
11. Use data and measurements, not just impressions. 12. Keep all rules in this bible and improve it after every video.

## 14. Lessons from real productions
- 2026-11-07 (Visual Impact balloon ad): MiniMax H3 adds its own audio track to every clip even without a sound option. It did not cost extra here, but always pass `withSoundEffects:false` / `noMusic` where the model allows it, check `simulate_cost` with the exact arguments, and strip clip audio in the edit (`-an`). Our sound is built separately.
- AI video between two keyframes with a large camera swing (e.g. 180° from behind a person to in front of them) makes the model invent a new room mid-clip. Keep each AI clip's start and end frames close in angle; do big moves as several small clips or in code.
- Hebrew on-screen text: thick sans (Heebo 800/900) reads premium; a thin serif read badly to the owner. Orange words on an orange background need a dark drop shadow and a soft dark band behind the line.
- Owner's sound taste: calm, slow and immersive beats fast. Bed at ~66 bpm, sparse ticks, beds that swell from quiet, real silences; target dynamic range p90/p10 ~29 dB (the reference ad). Never use bright noise bursts (debris, cracks >3 kHz) on a pop: it reads as a harsh scratch. Make the pop a low rounded thump. End with a 1.5 s audio fade and a short fade to black, never a hard stop.
- Owner's text taste: no dark gradient bands behind text. Keep legibility with a tight dark halo around the glyphs; accent words in bright glowing flat orange (#ff9a3c with glow), not a brown gradient.
- Show the "it's CGI" reveal visually a beat BEFORE the voice/text says it.
- Phone-screen transitions: replace the phone screen with the next shot (perspective warp onto the screen quad) and move the camera through the screen by interpolating the quad corners to the frame corners. Continuous, no blend cut, no glitches.
- Gemini TTS (sonic_boom) files end with a short digital burst about 0.1-0.15 s before the end (loud click then a dropout). Always trim the last 0.2 s of every Gemini voice file and fade out, then scan the final mix for spikes/dropouts at 10 ms resolution before sending.
- Lip sync workflow that works for Hebrew: generate the clip in Seedance (draft first), make the Hebrew line in TTS, lip-sync it onto the clip with Lipsync 2.0, then take ONLY the picture from the lip-sync output and rebuild all sound from the source files with fades. Never reuse the lip-sync output audio (it carries cuts).
- Running/chasing shouts: direct "out of breath from running, not from crying, no sobbing" or the model plays it as crying.
