import type { ComponentType } from "react";

export interface UpdateInfo {
  version: string;
  updateType: "mandatory" | "optional";
  mandatory: boolean;
  minimumSupportedVersion: string;
  downloadUrl: string;
  sha256: string;
  fileSize: number;
  releaseDate: string;
  releaseNotes: string[];
  message: string;
  enabled: boolean;
}

export interface ReleaseInfo {
  version: string;
  buildNumber?: number;
  releaseDate: string;
  downloadUrl?: string;
  fileSize?: number;
  sha256?: string;
  supportStatus?: "active" | "deprecated";
  category?: string;
  releaseNotesSummary?: string;
  releaseNotes: {
    additions?: string[];
    improvements?: string[];
    fixes?: string[];
    security?: string[];
    breakingChanges?: string[];
    knownIssues?: string[];
  };
}

export interface SettingsInfo {
  appName: string;
  website: string;
  supportEmail: string;
  githubRepository: string;
  githubReleases: string;
  privacyUrl: string;
  termsUrl: string;
  copyright: string;
  defaultLanguage: string;
  theme: string;
}

export interface SocialLinks {
  email: string;
  website: string;
  github: string;
  facebook: string;
  youtube: string;
  telegram: string;
}

export interface ScreenshotItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  category: string;
  iconName: string;
  isKeyFeature: boolean;
  displayOrder: number;
}

export interface SystemRequirements {
  supportedWindowsVersions: string[];
  architecture: string;
  minimum: {
    cpu: string;
    ram: string;
    diskSpace: string;
    dotnetVersion: string;
  };
  recommended: {
    cpu: string;
    ram: string;
    diskSpace: string;
    dotnetVersion: string;
  };
  additionalSoftware: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export interface ChangelogItem {
  version: string;
  buildNumber: number;
  releaseDate: string;
  summary: string;
  changes: {
    additions: string[];
    improvements: string[];
    fixes: string[];
    security: string[];
  };
}

export interface NavLink {
  href: string;
  label: string;
}
