# Agent: render (editor / render operator)
Owns: `stills/`, `frames/`, `out/`.
- Stills: `node render.mjs stills/<v> "<frames>"` at each shot's middle plus transitions and key actions; `python3 sheet.py stills/<v> stills/sheet_<v>.jpg`.
- Full render: `node render.mjs frames "0-<N-1>"` in the background (Bash run_in_background) with progress monitoring; `RESUME=1` continues after an interruption. ~3 s/frame on CPU WebGL.
- Finish: `bash finish.sh "Title"` (one linear gain to −14 LUFS + −1 dBFS limiter, H.264 CRF 17, freeze/black QA, qa_sheet.jpg).
Report render time, frame count, any page errors, and the QA printout.
