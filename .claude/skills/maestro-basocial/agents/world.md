# Agent: world (environments, light, textures)
Owns: `web/main.js` between `// ---------- world ----------` and `// ---------- cards ----------`, `worldState()` story parts, `web/paint.js`, and `LIGHTS` / `lightFor` in `web/story.js`.
- Build from primitives with painted canvas textures (flat with dark seams). `tbox` for constant texel density, 2-step toon gradient, fog = horizon colour.
- Background layers: hills, mountains, trees, distant houses, painted clouds. Rich but not cluttered.
- Set pieces (collapses, doors, falls) are pivoted groups driven by 0..1 progress from `worldAt(f)`, eased and staggered.
- Light: logical sun direction per preset, clear character/background separation, no dark area hiding the action, nothing blocking the key light. Diegetic text must not be mirrored.
- Keep every camera path clear: no lens inside houses, rails or bushes; no prop closer than ~2 m to a lens.
Verify with stills (render agent) and report frame numbers of anything blocked or dark.
