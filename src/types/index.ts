export interface EWasteAnalysisResult {
  deviceIdentification: {
    brand: string;
    model: string;
    estimatedYear: number;
    category: string;
    imageUrl: string;
  };
  extractableResources: {
    gold: { grams: number; estimatedValueUsd: number };
    silver: { grams: number; estimatedValueUsd: number };
    copper: { grams: number; estimatedValueUsd: number };
    palladium: { grams: number; estimatedValueUsd: number };
    lithium: { grams: number; estimatedValueUsd: number };
    rareEarth: { grams: number; estimatedValueUsd: number };
  };
  marketValueAnalysis: {
    totalEstimatedUsd: number;
    totalEstimatedKrw: number;
    recyclingRewardKrw: number;
    marketTrends: string;
  };
  disassemblyDifficulty: {
    score: number; // 1-10
    levelText: string;
    safetyPrecautions: string[];
    recommendedTools: string[];
  };
  rawJsonPromptOutput: string;
}

export interface ChatMessage {
  id: string;
  sender: 'luna' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: { label: string; action: string }[];
  highlightAsset?: {
    device: string;
    goldGrams: number;
    valueKrw: number;
  };
}

export interface UserMemory {
  totalScannedDevices: number;
  totalAccumulatedKrw: number;
  deviceHistory: { name: string; date: string; valueKrw: number }[];
}

export interface MetricsData {
  pageViews: number; // 허무 지표
  analyzedCount: number;
  valueHypothesisClickRate: number; // 내 기기 판매하기 / 상세리포트(유료) 클릭률 (%)
  growthHypothesisShares: number; // 바이럴 공유 횟수
  viralCoefficient: number; // K-factor
  pickupConversionRate: number; // 실제 수거 신청 전환율 (%)
  totalRecycledAssetKrw: number;
}

export interface MasterProfile {
  id: string;
  name: string;
  avatar: string;
  rankTitle: string; // 예: "황금 연금술사", "희토류 헌터", "플래티넘 마스터"
  rankLevel: number;
  totalMetalGrams: number;
  recycledAssetsKrw: number;
  badges: string[];
  tipShared: string;
  likes: number;
}
