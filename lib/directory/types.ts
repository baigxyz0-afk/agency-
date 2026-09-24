export type VerificationStatus = "unverified" | "pending" | "verified";

export type Country = { id: string; name: string; slug: string };
export type Region = { id: string; name: string; slug: string; country_id: string };
export type City = { id: string; name: string; slug: string; region_id: string };
export type Industry = { id: string; name: string; slug: string };

export type AgencyLocation = {
  city: City;
  region: Region;
  country: Country;
} | null;

export type Agency = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  website: string | null;
  description: string | null;
  services: string[];
  founded_year: number | null;
  team_size: string | null;
  rating: number | null;
  review_count: number;
  verification_status: VerificationStatus;
  is_featured: boolean;
  is_sponsored: boolean;
  data_source: string | null;
  last_verified_at: string | null;
  location: AgencyLocation;
  industries: Industry[];
};

export type AgencySort = "relevance" | "rating" | "reviews" | "recent";

export const MIN_LISTINGS_TO_INDEX = 1;
