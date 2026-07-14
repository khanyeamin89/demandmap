export interface District {
  id: string;
  name: string;
  englishName: string;
  banglaName: string;
  division: string;
  x: number; // Coordinate percentage on X-axis (0-100)
  y: number; // Coordinate percentage on Y-axis (0-100)
  population: number; // Approximate in millions
}

export interface TrendMetric {
  districtId: string;
  demandIndex: number; // 0 to 100
  searchVolume: number; // relative monthly searches
  socialMentions: number; // relative weekly post/comment count
  sentimentPositive: number; // 0 to 100 percentage
  ecommerceSales: number; // relative sales index
  topECommerceProduct: string;
  growthRate: number; // percentage change vs last month
}

export interface ForecastingPoint {
  month: string;
  demandIndex: number;
  confidenceInterval: [number, number];
}

export interface PlatformBreakdown {
  facebook: number; // % contribution
  instagram: number;
  tiktok: number;
  daraz: number; // e-commerce proxy
  localEcom: number; // other local e-commerce
}

export interface SearchResult {
  query: string;
  category: string;
  timestamp: string;
  summary: string;
  nationalAverageDemand: number;
  divisionAverages: Record<string, number>;
  topDistricts: Array<{
    districtId: string;
    name: string;
    demandIndex: number;
    socialMentions: number;
    growth: number;
  }>;
  districtTrends: Record<string, TrendMetric>;
  forecasting: Record<string, ForecastingPoint[]>; // districtId -> points
  platformBreakdown: PlatformBreakdown;
  sources: Array<{ title: string; url: string }>;
  seasonalAnalysis?: string;
  newsAnalysis?: string;
}

export interface HotProduct {
  id: string;
  name: string;
  category: string;
  demandScore: number;
  tiktokScore: number;
  growthRate: number;
  whyTrending: string;
  primaryChannel: string;
}

export interface PredictedProduct {
  id: string;
  name: string;
  predictedDemandScore: number;
  triggerNews: string;
  whyPotential: string;
  timeframe: string;
  confidenceScore: number;
}

export interface ProductsAnalyticsResult {
  hotProducts: HotProduct[];
  predictedProducts: PredictedProduct[];
  scrapedSources: Array<{ title: string; url: string }>;
  isSimulated: boolean;
  errorMsg?: string;
}

