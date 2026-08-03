// Shared radial-gauge geometry for HMI-style dashboard panels.
// 270° sweep with a 90° gap at the bottom, matching a physical dial.
export const GAUGE_CENTER = 100;
export const GAUGE_START_ANGLE = -135;
export const GAUGE_END_ANGLE = 135;
export const GAUGE_RADIUS = 80;

export function pointOnGauge(radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: GAUGE_CENTER + radius * Math.cos(rad),
    y: GAUGE_CENTER + radius * Math.sin(rad),
  };
}

export function describeArc(radius: number, startAngle: number, endAngle: number) {
  const start = pointOnGauge(radius, startAngle);
  const end = pointOnGauge(radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function angleForValue(value: number) {
  return GAUGE_START_ANGLE + (value / 100) * (GAUGE_END_ANGLE - GAUGE_START_ANGLE);
}

export const GAUGE_TRACK_PATH = describeArc(GAUGE_RADIUS, GAUGE_START_ANGLE, GAUGE_END_ANGLE);
export const GAUGE_TICK_VALUES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export const LOAD_ZONES = [
  { upTo: 60, label: "OPTIMAL", color: "#34d399" },
  { upTo: 85, label: "NOMINAL", color: "#22d3ee" },
  { upTo: 100, label: "PEAK LOAD", color: "#fbbf24" },
] as const;

export function getLoadZone(value: number) {
  return LOAD_ZONES.find((zone) => value <= zone.upTo) ?? LOAD_ZONES[LOAD_ZONES.length - 1];
}