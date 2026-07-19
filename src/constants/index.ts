export const APP_NAME = "Alpha Manager";
export const APP_TAGLINE = "منصة الإدارة الاحترافية لشبكات MikroTik وأجهزة البث";

// Environment variables configuration with production fallbacks
export const APP_DOMAIN = import.meta.env.VITE_APP_DOMAIN || "alphamanager.app";
export const APP_URL = import.meta.env.VITE_WEBSITE_URL || `https://${APP_DOMAIN}`;
export const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || "support@alphamanager.app";
export const GITHUB_REPO_URL = import.meta.env.VITE_GITHUB_REPO_URL || "https://github.com/azizalmassah2/alpha-manager-updates";

export const UPDATE_JSON_URL = import.meta.env.VITE_UPDATE_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/update.json";
export const VERSIONS_JSON_URL = import.meta.env.VITE_VERSIONS_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/versions.json";
export const SETTINGS_JSON_URL = import.meta.env.VITE_SETTINGS_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/settings.json";
export const SOCIAL_JSON_URL = import.meta.env.VITE_SOCIAL_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/social.json";
export const SCREENSHOTS_JSON_URL = import.meta.env.VITE_SCREENSHOTS_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/screenshots.json";
export const FEATURES_JSON_URL = import.meta.env.VITE_FEATURES_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/features.json";
export const REQUIREMENTS_JSON_URL = import.meta.env.VITE_REQUIREMENTS_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/requirements.json";
export const FAQ_JSON_URL = import.meta.env.VITE_FAQ_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/faq.json";
export const CHANGELOG_JSON_URL = import.meta.env.VITE_CHANGELOG_JSON_URL || "https://raw.githubusercontent.com/azizalmassah2/alpha-manager-updates/main/changelog.json";
