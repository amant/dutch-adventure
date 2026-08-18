/**
 * Speed drills must give the learner enough time to actually type a response,
 * so every speed drill is clamped to at least this many seconds.
 */
export const SPEED_DRILL_MIN_SECONDS = 60;

/**
 * Resolve a speed drill's timer duration, enforcing the 60-second minimum.
 * Falls back to the minimum when no duration is configured.
 */
export function speedDrillDuration(configured?: number): number {
  return Math.max(configured ?? SPEED_DRILL_MIN_SECONDS, SPEED_DRILL_MIN_SECONDS);
}
