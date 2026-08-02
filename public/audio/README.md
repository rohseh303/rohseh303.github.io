# Audio Files

Place your Social Network soundtrack files here with these exact names:

- `in-motion.mp3`
- `hand-covers-bruise.mp3`
- `familiar-taste.mp3`
- `intriguing-possibilities.mp3`
- `painted-sun-in-abstract.mp3`

## How to Switch Tracks

Edit `lib/audioConfig.ts` and change the `CURRENT_TRACK` value:

```ts
export const CURRENT_TRACK = TRACKS.IN_MOTION; // Change this to switch tracks
```

Available options:
- `TRACKS.IN_MOTION`
- `TRACKS.HAND_COVERS_BRUISE`
- `TRACKS.FAMILIAR_TASTE`
- `TRACKS.INTRIGUING_POSSIBILITIES`
- `TRACKS.PAINTED_SUN`

## Duration

The track will play for 12 seconds (configurable in `lib/audioConfig.ts` via `TRACK_DURATION`).

## Supported Formats

MP3, OGG, WAV

## Note

Browsers may block autoplay until user interaction. The audio will attempt to play automatically, but may require user interaction on some browsers.
