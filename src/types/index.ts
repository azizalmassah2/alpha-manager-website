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
  releaseDate: string;
  fileSize?: number;
  downloadUrl?: string;
  sha256?: string;
  releaseNotes: string[];
  mandatory?: boolean;
}

export interface SystemRequirement {
  label: string;
  value: string;
}

export interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface NavLink {
  href: string;
  label: string;
}
