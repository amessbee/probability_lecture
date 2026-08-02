# Interactive Monty Hall Presentation

Single-file cinematic presentation for a 15-20 minute lecture motivating probability through the Monty Hall problem.

## Highlights

- Native in-file slide engine with smooth transitions
- Dark gradient + glassmorphism visual style
- Animated SVG doors, goats, and sports car reveal
- Probability flow animation (1/3, 1/3, 1/3 -> 1/3, 0, 2/3)
- Live Monte Carlo simulation (1000 and 5000 games)
- 100-door demonstration with 98-door opening animation
- Minimal text, visual-first narrative across 11 slides

## Run

Open `index.html` directly in a browser (no internet required), or serve locally:

```bash
cd /Users/lupin/work/mudassir/probability_lecture
python3 -m http.server 8000
```

Then open:

- <http://localhost:8000/index.html>

## Navigation and Interaction

- Right arrow / PageDown / Space: next slide
- Left arrow / PageUp: previous slide
- On-screen controls and progress bar
- Click a door on Slide 2 to commit choice
- Use slide buttons to run door reveal, probability flow, fast games, simulation, and 100-door demo

## Deck Structure

1. Can You Trust Your Intuition?
2. Three Doors (audience commits)
3. Monty Opens a Goat Door
4. Stay vs Switch Poll
5. The 50% Trap
6. Probability Flow (core idea)
7. Five Rapid Games
8. 1000+ Monte Carlo Runs
9. 100-Door Version
10. Intuition Failure Paradoxes
11. Closing: Mathematics trains intuition

## Offline Guarantee

This presentation is fully self-contained in `index.html` and does not depend on external CDNs, frameworks, or font downloads.
