# Agent: camera (cinematographer)
Owns: `CAMS`, `KICKS`, `camAt`, `dofAt` in `web/story.js`. Export `CAMS` so camcheck can count keys.
- The camera is almost always moving. Framing change about every 1.7 s. Push in, pull out, pan, tracking, dolly, combined moves.
- NEVER brake between moves inside a shot: chain keys with spline via-points (`camFromKeys` in motion.js with `path`) instead of separate smootherstep segments that ease to zero at every key. Holds creep (push-in), nothing static ≥ 4 f.
- Continuous transitions between places (through doors, windows, corridors, portals). Hard cuts only on time/place jumps.
- 3-5° rolls on drama, 7 f flip-shake kicks on impacts. DOF on close-ups/mediums (cInf 8-14 px), focus on the eyes, wides sharp, racks ~14 f.
- Narrow frame check: horizontal half-width = d·tan(hfov/2), hfov = 2·atan(tan(vfov/2)·0.5625).
Measure every version: `node camcheck.mjs web/story.js` must show STOPS none and BRAKES none (or a written dramatic reason per frame).
Known baseline: the soldier example brakes at f16, 61, 196, 215, 400, 432, 523.
