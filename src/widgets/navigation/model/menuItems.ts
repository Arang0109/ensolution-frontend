// widgets/navigation/model/menuItems.ts

export interface MenuItem {
  key: string;
  label: string;
  path?: string;
  children?: MenuItem[];
  icon?: string;
}

// ================================

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "dashboard",
    label: "대시보드",
    path: "/dashboard",
  },

  {
    key: "client",
    label: "업체관리",
    children: [
      {
        key: "company",
        label: "측정대행 의뢰업체",
        path: "/company",
      },
      {
        key: "workplace",
        label: "측정대상 사업장",
        path: "/workplace",
      },
      {
        key: "stack",
        label: "측정시설",
        path: "/stack",
      },
    ],
  },

  {
    key: "internal",
    label: "내부관리",
    children: [
      {
        key: "team",
        label: "팀 관리",
        path: "/team",
      },
      {
        key: "equipment",
        label: "장비 관리",
        path: "/equipment",
      },
      {
        key: "pollutant",
        label: "측정물질 관리",
        path: "/pollutant",
      },
    ],
  },

  {
    key: "measurement",
    label: "측정관리",
    children: [
      {
        key: "plan",
        label: "측정계획",
        path: "/plan",
      },
      {
        key: "result",
        label: "측정결과",
        path: "/measurements",
      },
    ],
  },
];