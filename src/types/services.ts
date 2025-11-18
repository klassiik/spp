import { LucideIcon } from "lucide-react";

export type ServiceCategory = "core" | "additional";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  icon: string; // Icon name from lucide-react
}
