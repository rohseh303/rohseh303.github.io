export const TRACKS = {
  IN_MOTION: 'in-motion.mp3',
  HAND_COVERS_BRUISE: 'hand-covers-bruise.mp3',
  FAMILIAR_TASTE: 'familiar-taste.mp3',
  INTRIGUING_POSSIBILITIES: 'intriguing-possibilities.mp3',
  PAINTED_SUN: 'painted-sun-in-abstract.mp3',
} as const;

// Change this to switch tracks easily!
export const CURRENT_TRACK = TRACKS.IN_MOTION;

// Duration in seconds (10-15 seconds)
export const TRACK_DURATION = 12;
