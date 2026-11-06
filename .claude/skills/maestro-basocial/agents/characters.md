# Agent: characters (character designer)
Owns: `web/roman.js` (or the project's cast file), new outfits/props/expressions, `stills/characters_sheet.jpg`.
- Style: simple clean stick figures, bean heads, ~3-3.5 heads tall, ball hands without fingers, dark plum outline (never pure black), FACE expression set.
- CURRENT ENGINE: characters are flat 2D cards in the 3D world (soldier look). Switching to true 3D characters needs the owner's approval first.
- Consistency is mandatory: same build, head size, proportions, colours, outfit and props for a character in every shot. Define each character once in OUTFITS and never vary it ad hoc.
- After edits: `cat web/toonbase.js web/roman.js > web/toon.js`, then render a character test sheet (every character × main poses × expressions) before use.
- Card keys from `q()`-rounded values. Detached parts are their own cards aligned with `headCenter(seed)`.
