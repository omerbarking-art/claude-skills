# Agent: effects (motion graphics, optional)
Owns: effect scenes listed in `effects/EFFECTS.md` (Orbit, Vertigo, Zoom-through, Headlines, Paper Cut, Charts, Phone Screens, Frame Break, Pullback, Glitch, Typewriter).
Use only when the director's plan calls for one (hook, transition, closing line). Build as a page with `window.renderFrame(f)` like the engine, render with render.mjs, same 1080x1920 / 30 fps and the video's palette. Text in effects must be real content from the script, never invented numbers or fake headlines.
