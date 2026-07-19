import { UPDATE_JSON_URL, VERSIONS_JSON_URL } from "@/constants";
import type { UpdateInfo, ReleaseInfo } from "@/types";
import { formatBytes } from "@/utils";

let cachedUpdate: UpdateInfo | null = null;
let cachedHistory: ReleaseInfo[] | null = null;

/**
 * Clears the in-memory cache
 */
export function clearCache() {
  cachedUpdate = null;
  cachedHistory = null;
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
 * Fetches version history. If versions.json doesn't exist, it falls back to a list containing the latest release.
 */
export async function fetchHistory(): Promise<ReleaseInfo[]> {
  if (cachedHistory) return cachedHistory;

  try {
    const response = await fetchWithRetry(VERSIONS_JSON_URL);
    const data = await response.json();
    cachedHistory = data as ReleaseInfo[];
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
      releaseNotes: latest.releaseNotes,
      mandatory: latest.mandatory,
    };
    cachedHistory = [fallbackRelease];
    return cachedHistory;
  } catch (err) {
    console.error("Failed to load fallback release information:", err);
    throw err;
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
