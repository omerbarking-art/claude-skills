// Camera QA from story.js (no browser):  node camcheck.mjs [web/story.js]
// Prints shot lengths, framing-change rate, and frames where the camera stops or "brakes" between moves.
import path from 'path'; import { pathToFileURL } from 'url';
const S = await import(pathToFileURL(path.resolve(process.argv[2] || 'web/story.js')).href);
const N = S.TOTAL, fps = S.FPS || 30, v = [];
const dir = (c) => { const d = c.look.map((x, i) => x - c.pos[i]), l = Math.hypot(...d); return d.map((x) => x / l); };
for (let f = 1; f < N; f++) {
  const a = S.camAt(f - 1), b = S.camAt(f), cut = S.shotAt(f).id !== S.shotAt(f - 1).id;
  const dp = Math.hypot(...b.pos.map((x, i) => x - a.pos[i])), da = Math.acos(Math.min(1, dir(a).reduce((s, x, i) => s + x * dir(b)[i], 0)));
  v.push({ f, cut, s: dp + da * 8 + Math.abs(b.fov - a.fov) * 0.05 + Math.abs((b.roll || 0) - (a.roll || 0)) * 0.02 });
}
const shots = S.SHOTS.map((s) => ({ id: s.id, sec: +((s.b - s.a + 1) / fps).toFixed(2) }));
console.log('shots', shots.map((s) => `${s.id} ${s.sec}s`).join(' | '));
console.log(`mean shot ${(N / fps / shots.length).toFixed(2)} s`);
const peak = Math.max(...v.map((x) => x.s)), STILL = 1e-4, MOVE = 0.02, still = v.filter((x) => !x.cut && x.s < STILL);
const runs = []; let r = null;
for (const x of still) { if (r && x.f === r.b + 1) r.b = x.f; else { r = { a: x.f, b: x.f }; runs.push(r); } }
const stops = runs.filter((r) => r.b - r.a + 1 >= 4);
console.log(`STOPS (camera static >= 4 f): ${stops.length ? stops.map((r) => `f${r.a}-${r.b}`).join(', ') : 'none'}`);
// brakes: speed dips to < 15 % of the surrounding peak inside a shot (e.g. smootherstep easing to zero at a mid-shot key)
const brakes = [];
for (let i = 3; i < v.length - 3; i++) {
  const w = v.slice(i - 3, i + 4); if (w.some((x) => x.cut)) continue;
  const lo = v[i].s, before = Math.max(...v.slice(Math.max(0, i - 12), i).map((x) => x.s)), after = Math.max(...v.slice(i + 1, i + 13).map((x) => x.s));
  if (lo < 0.15 * Math.min(before, after) && Math.min(before, after) > MOVE && lo <= Math.min(v[i - 1].s, v[i + 1].s)) brakes.push(v[i].f);
}
console.log(`BRAKES (slow-down to near zero between moves): ${brakes.length ? brakes.map((f) => `f${f} (${(f / fps).toFixed(2)}s)`).join(', ') : 'none'}`);
const keys = S.CAMS ? Object.values(S.CAMS).reduce((n, k) => n + k.length - 1, 0) : null;
const changes = keys ?? shots.length + brakes.length;
console.log(`framing changes ${keys ? '(camera key segments)' : '(shots + brakes, export CAMS for an exact count)'}: ${changes} -> one every ${(N / fps / changes).toFixed(2)} s (target ~1.7 s)`);
