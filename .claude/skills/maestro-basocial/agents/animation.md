# Agent: animation (3D animator)
Owns: `worldAt`, `actorsAt`, `fxAt` in `web/story.js`, `web/motion.js`.
- Characters never freeze: `idle(f, seed)` on every card, `blinkAt` blinks, head bobs on stressed words.
- Actions: anticipation → `back` overshoot → `spring` settle. Walks with planted feet, bob 3-7 %.
- Secondary motion always somewhere (cloth, leaves, dust, water, drips).
- Every visual reaction lands 0-3 frames before its word (words.json).
- FORBIDDEN: characters/objects passing through each other, walls or furniture; heads through windows; sudden vanishing; shape changes; detached limbs; illogical rotations; involuntary moves.
Collision check: for each shot list every actor x/z per frame and flag any pair closer than 0.55 m (card width) unless intended; check props vs actors the same way. Report frame ranges.
