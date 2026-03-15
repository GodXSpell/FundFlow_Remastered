// import { USER } from "@/features/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  // name: USER.displayName,
  url: process.env.APP_URL || "https://tarunpreetsingh.com",
  // ogImage: USER.ogImage,
  // description: USER.bio,
  // keywords: USER.keywords,d:\TarunpreetSingh.com\src\types\nav.ts
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  // {
  //   title: "Home",
  //   href: "/",
  // },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Budgets",
    href: "/budgets",
  },
  // {
  //   title: "Components",
  //   href: "/components",
  // },
  {
    title: "Transactions",
    href: "/transactions",
  },
];

// below is for tracking from where the user came
// export const UTM_PARAMS = {
//   utm_source: "tarunpreetsingh.com",
//   utm_medium: "portfolio_website",
//   utm_campaign: "referral",
// };
