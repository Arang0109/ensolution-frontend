export const TeamType = {
  TEAM_1: 1,
  TEAM_2: 2,
  TEAM_3: 3,
  TEAM_4: 4,
} as const;
export type TeamType = typeof TeamType[keyof typeof TeamType];

export const TEAM_TYPE_OPTIONS: { value: TeamType; label: string }[] = [
  { value: TeamType.TEAM_1, label: "1팀" },
  { value: TeamType.TEAM_2, label: "2팀" },
  { value: TeamType.TEAM_3, label: "3팀" },
  { value: TeamType.TEAM_4, label: "4팀" },
];