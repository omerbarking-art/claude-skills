---
name: video-effects
description: Build short motion-graphics effects for vertical videos in code (Remotion, or plain three.js/Canvas rendered with Playwright + ffmpeg). 11 effects: Orbit, Vertigo, Zoom-through, Headlines, Paper Cut, Charts, Phone Screens, Frame Break, Pullback, Glitch, Typewriter. Use when the user asks for one of these effects, a hook/opening, a transition, a glitch, a typewriter line, a chart animation, or wants to add effects to a short (including shorts made with the cartoon-3d-short skill).
---

# Video effects (11 motion-graphics scenes)

Source list: `original-11-effects.md` (the effect name, what it is, when to use it, base prompt).

## Shared base (apply to every effect so they read as one video)
Unless the user or the project says otherwise:
- Vertical 1080x1920, 30 fps. Final export can be 2K (1440x2560) like the cartoon shorts.
- Length: transitions 6-8 frames; scenes 2-4 s.
- One palette for the whole video: background, one accent, text colour. Ask once, then keep it in a `theme.ts` constant.
- One font family (bold sans by default), loaded locally.
- Easing: smootherstep / ease-out bursts. No linear moves. Every hold creeps (slow push-in), never a frozen frame.
- No stock look: no default gradients, no generic glow on everything.
- Text that must sync to voice needs word timings (`words.json`, same format as the cartoon-3d-short skill). Without it, ask for the voice file or time by hand.

## Render paths
1. **Remotion** (preferred when a Remotion project exists): one composition per effect, `useCurrentFrame()` for all motion, so renders are frame-exact.
2. **No Remotion**: a single HTML page (three.js or Canvas2D) that exposes `window.renderFrame(n)`; drive it with Playwright frame by frame, save PNGs, join with `ffmpeg -framerate 30 -i f_%04d.png -c:v libx264 -pix_fmt yuv420p -crf 16 out.mp4`. Never record real time: it drops frames.

## Effect cheat sheet
| # | Effect | Use it for | Key build notes |
|---|---|---|---|
| 01 | Orbit | first second, stop the scroll | 3D phone rising + slow Y turn; feed = tiles scrolling with motion blur; label pinned to top edge |
| 02 | Vertigo | shock line | dolly zoom: move camera back while narrowing FOV so the centre card keeps its screen size (`tan(fov/2) * dist` constant) |
| 03 | Zoom-through | idea to idea, no cut | 6 f crash zoom, cross the tile plane, second grid already lit behind it |
| 04 | Headlines | "everyone is talking" | wall tilted ~25-35° back, 4 columns, neighbours scroll opposite ways. User's own headlines only |
| 05 | Paper Cut | texture change in a dark video | cream paper slap + small bounce (overshoot 3-5 %), letterpress words timed to words.json |
| 06 | Charts | numbers, growth | 16 bars, staggered wave (2-3 f offset), colour/height build first to last, second wave |
| 07 | Phone Screens | show an app or result | centre phone, rings breathing out, side labels pop in with overshoot |
| 08 | Frame Break | surprise / mid-video reset | character leans past frame edge, then 5x5 tiles spin away from centre |
| 09 | Pullback | big picture after details | start tight on one row, fast crane up until whole board fills the frame |
| 10 | Glitch | hard section cut, mistake reveal | 8 f: R/B channel split + horizontal bands jumping sideways, then clean snap |
| 11 | Typewriter | closing line, "building" | terminal window, natural typing speed with small random gaps, blinking cursor, export keystroke times for click SFX |

## Workflow
1. Ask which effect(s) and the words/labels (one question at a time for non-technical users).
2. Build at `--scale 0.5`, render 3-4 stills, check them, then render the clip.
3. Send the mp4 with SendUserFile. Iterate: first versions look generic; expect 2-3 fix rounds.
4. Combining with cartoon-3d-short: Orbit or Glitch as the hook, Zoom-through/Glitch as section transitions, Typewriter as the closing line. Keep that skill's rules (no captions unless asked, own story and voice).
