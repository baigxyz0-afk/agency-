// Real, verifiable figures only. Leave a field `null` until you have an actual
// number to report — the trust section hides any stat that isn't set rather
// than rendering a placeholder number. Do not fill these with invented figures.
export type SiteStat = {
  label: string;
  value: number | string | null;
  suffix?: string;
};

export const siteStats: SiteStat[] = [
  { label: "Projects Completed", value: null }, // TODO: real count
  { label: "Industries Served", value: null }, // TODO: real count
  { label: "Countries Served", value: null }, // TODO: real count
  { label: "Years of Experience", value: null }, // TODO: founding year or years active
];
