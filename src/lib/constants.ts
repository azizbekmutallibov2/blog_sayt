export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";
export const THEME_STORAGE_KEY = "theme-preference-v2";

export const SECTION_KINDS = ["BLOG", "IT", "CUSTOM"] as const;
export type SectionKind = (typeof SECTION_KINDS)[number];

export const NAV_PLACEMENTS = ["MAIN", "MORE", "HIDDEN"] as const;
export type NavPlacement = (typeof NAV_PLACEMENTS)[number];

export const SECTION_LAYOUTS = ["GRID", "LIST"] as const;
export type SectionLayout = (typeof SECTION_LAYOUTS)[number];


export const SOCIAL_PLATFORMS = [
  "telegram",
  "github",
  "linkedin",
  "youtube",
  "instagram",
  "x",
  "facebook",
  "leetcode",
  "email",
  "website",
] as const;
export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export const COOKIE = {
  admin: "admin_session",
  locale: "locale",
} as const;

export const RESUME_KINDS = ["EXPERIENCE", "EDUCATION"] as const;
export type ResumeKind = (typeof RESUME_KINDS)[number];

export const SETTING_KEYS = ["siteTitle", "leetcodeUsername", "authorName", "skills"] as const;

export const POSTS_PER_PAGE = 10;
export const HOME_POSTS = 4;
export type SettingKey = (typeof SETTING_KEYS)[number];
