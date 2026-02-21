# Player layout (no build step)

- Put this `player/` folder in your repo root.
- Keep your shaders in repo root at `shaders/`.
- Maintain `shaders/manifest.json` by hand — list the `.frag` files you want in the dropdown.

Use the batch files or scripts to run the player or use Python:
```
cd player
python -m http.server 8000
# open http://localhost:8000
```

Then point your browser to: [http://localhost:8000/player/](http://localhost:8000/player/)