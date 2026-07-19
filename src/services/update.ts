import {
  UPDATE_JSON_URL,
  VERSIONS_JSON_URL,
  SETTINGS_JSON_URL,
  SOCIAL_JSON_URL,
  SCREENSHOTS_JSON_URL,
  FEATURES_JSON_URL,
  REQUIREMENTS_JSON_URL,
  FAQ_JSON_URL,
  CHANGELOG_JSON_URL,
} from "@/constants";
import type {
  UpdateInfo,
  ReleaseInfo,
  SettingsInfo,
  SocialLinks,
  ScreenshotItem,
  FeatureItem,
  SystemRequirements,
  FAQItem,
  ChangelogItem,
} from "@/types";
import { formatBytes } from "@/utils";

let cachedUpdate: UpdateInfo | null = null;
let cachedHistory: ReleaseInfo[] | null = null;
let cachedSettings: SettingsInfo | null = null;
let cachedSocial: SocialLinks | null = null;
let cachedScreenshots: ScreenshotItem[] | null = null;
let cachedFeatures: FeatureItem[] | null = null;
let cachedRequirements: SystemRequirements | null = null;
let cachedFAQ: FAQItem[] | null = null;
let cachedChangelog: ChangelogItem[] | null = null;

/**
 * Clears the in-memory cache
 */
export function clearCache() {
  cachedUpdate = null;
  cachedHistory = null;
  cachedSettings = null;
  cachedSocial = null;
  cachedScreenshots = null;
  cachedFeatures = null;
  cachedRequirements = null;
  cachedFAQ = null;
  cachedChangelog = null;
}

/**
 * Helper to fetch resource with timeout protection and retry strategy
 */
async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

    try {
      const response = await fetch(`${url}?t=${Date.now()}`, {
        signal: controller.signal,
        cache: "no-store", // bypass local cache safely
      });
      clearTimeout(timeoutId);
      if (response.ok) return response;
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    } catch (err) {
      clearTimeout(timeoutId);
      if (i === retries - 1) {
        throw err;
      }
      // Wait before next retry
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

/**
 * Fetches the latest update configuration from update.json
 */
export async function fetchUpdateInfo(): Promise<UpdateInfo> {
  if (cachedUpdate) return cachedUpdate;

  try {
    const response = await fetchWithRetry(UPDATE_JSON_URL);
    const data = await response.json();
    cachedUpdate = data as UpdateInfo;
    return cachedUpdate;
  } catch (error) {
    console.error("Error in updateService.fetchUpdateInfo:", error);
    throw error;
  }
}

/**
 * Fetches version history.
 */
export async function fetchHistory(): Promise<ReleaseInfo[]> {
  if (cachedHistory) return cachedHistory;

  try {
    const response = await fetchWithRetry(VERSIONS_JSON_URL);
    const json = await response.json();
    cachedHistory = json.data as ReleaseInfo[];
    return cachedHistory;
  } catch (error) {
    console.warn("Failed to fetch historical versions, falling back to latest release:", error);
  }

  // Fallback: use the latest release info
  try {
    const latest = await fetchUpdateInfo();
    const fallbackRelease: ReleaseInfo = {
      version: latest.version,
      releaseDate: latest.releaseDate,
      fileSize: latest.fileSize,
      downloadUrl: latest.downloadUrl,
      sha256: latest.sha256,
      releaseNotes: {
        additions: latest.releaseNotes,
      },
      mandatory: latest.mandatory,
    };
    cachedHistory = [fallbackRelease];
    return cachedHistory;
  } catch (err) {
    console.error("Failed to load fallback release information:", err);
    throw err;
  }
}

/**
 * Fetches settings.json configurations
 */
export async function fetchSettings(): Promise<SettingsInfo> {
  if (cachedSettings) return cachedSettings;

  try {
    const response = await fetchWithRetry(SETTINGS_JSON_URL);
    const data = await response.json();
    cachedSettings = data as SettingsInfo;
    return cachedSettings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      appName: "Alpha Manager",
      website: "https://alphamanager.app",
      supportEmail: "support@alphamanager.app",
      githubRepository: "https://github.com/azizalmassah2/alpha-manager-updates",
      githubReleases: "https://github.com/azizalmassah2/alpha-manager-updates/releases",
      privacyUrl: "/privacy",
      termsUrl: "/terms",
      copyright: "© 2026 Alpha Manager. All Rights Reserved.",
      defaultLanguage: "ar",
      theme: "dark",
    };
  }
}

/**
 * Fetches social.json links
 */
export async function fetchSocial(): Promise<SocialLinks> {
  if (cachedSocial) return cachedSocial;

  try {
    const response = await fetchWithRetry(SOCIAL_JSON_URL);
    const data = await response.json();
    cachedSocial = data as SocialLinks;
    return cachedSocial;
  } catch (error) {
    console.error("Error fetching social links:", error);
    return {
      email: "support@alphamanager.app",
      website: "https://alphamanager.app",
      github: "https://github.com/azizalmassah2",
      facebook: "https://facebook.com/alphamanager",
      youtube: "https://youtube.com/alphamanager",
      telegram: "https://t.me/alphamanager_support",
    };
  }
}

/**
 * Fetches screenshots.json array
 */
export async function fetchScreenshots(): Promise<ScreenshotItem[]> {
  if (cachedScreenshots) return cachedScreenshots;

  try {
    const response = await fetchWithRetry(SCREENSHOTS_JSON_URL);
    const json = await response.json();
    cachedScreenshots = json.data as ScreenshotItem[];
    return cachedScreenshots;
  } catch (error) {
    console.error("Error fetching screenshots:", error);
    return [];
  }
}

/**
 * Fetches features.json array
 */
export async function fetchFeatures(): Promise<FeatureItem[]> {
  if (cachedFeatures) return cachedFeatures;

  try {
    const response = await fetchWithRetry(FEATURES_JSON_URL);
    const json = await response.json();
    cachedFeatures = json.data as FeatureItem[];
    return cachedFeatures;
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}

/**
 * Fetches requirements.json configuration
 */
export async function fetchRequirements(): Promise<SystemRequirements> {
  if (cachedRequirements) return cachedRequirements;

  try {
    const response = await fetchWithRetry(REQUIREMENTS_JSON_URL);
    const data = await response.json();
    cachedRequirements = data as SystemRequirements;
    return cachedRequirements;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return {
      supportedWindowsVersions: [
        "Windows 10 (Build 19041 وأحدث)",
        "Windows 11",
        "Windows Server 2019",
        "Windows Server 2022",
      ],
      architecture: "x64 / x86 / ARM64 (مع محاكي)",
      minimum: {
        cpu: "Intel Core i3 أو ما يعادله ثنائي النواة بسرعة 2.0 GHz",
        ram: "4 GB",
        diskSpace: "200 MB مساحة فارغة للبرنامج",
        dotnetVersion: ".NET Desktop Runtime 8.0",
      },
      recommended: {
        cpu: "Intel Core i5 أو ما يعادله رباعي النواة وأعلى",
        ram: "8 GB",
        diskSpace: "1 GB (لتخزين النسخ الاحتياطية)",
        dotnetVersion: ".NET Desktop Runtime 8.0",
      },
      additionalSoftware: [
        "Microsoft Edge WebView2 Runtime (مدمج في ويندوز 11 وتثبيت تلقائي في 10)",
      ],
    };
  }
}

/**
 * Fetches faq.json array
 */
export async function fetchFAQ(): Promise<FAQItem[]> {
  if (cachedFAQ) return cachedFAQ;

  try {
    const response = await fetchWithRetry(FAQ_JSON_URL);
    const json = await response.json();
    cachedFAQ = json.data as FAQItem[];
    return cachedFAQ;
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return [];
  }
}

/**
 * Fetches changelog.json array
 */
export async function fetchChangelog(): Promise<ChangelogItem[]> {
  if (cachedChangelog) return cachedChangelog;

  try {
    const response = await fetchWithRetry(CHANGELOG_JSON_URL);
    const json = await response.json();
    cachedChangelog = json.data as ChangelogItem[];
    return cachedChangelog;
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return [];
  }
}

// Clean helper methods for the UI
export async function getLatestUpdate(): Promise<UpdateInfo> {
  return fetchUpdateInfo();
}

export async function getVersion(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.version;
}

export async function getDownloadUrl(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.downloadUrl;
}

export async function getReleaseNotes(): Promise<string[]> {
  const update = await fetchUpdateInfo();
  return update.releaseNotes;
}

export async function getSHA256(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.sha256;
}

export async function getReleaseDate(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.releaseDate;
}

export async function getFileSize(): Promise<number> {
  const update = await fetchUpdateInfo();
  return update.fileSize;
}

export async function getFormattedFileSize(): Promise<string> {
  const size = await getFileSize();
  return formatBytes(size);
}

export async function getUpdateMessage(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.message;
}

export async function getMinimumSupportedVersion(): Promise<string> {
  const update = await fetchUpdateInfo();
  return update.minimumSupportedVersion;
}

export async function isMandatory(): Promise<boolean> {
  const update = await fetchUpdateInfo();
  return update.mandatory;
}

export async function isEnabled(): Promise<boolean> {
  const update = await fetchUpdateInfo();
  return update.enabled;
}

export async function getUpdateHistory(): Promise<ReleaseInfo[]> {
  return fetchHistory();
}
