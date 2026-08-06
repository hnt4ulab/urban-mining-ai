import { EWasteAnalysisResult, MetricsData, MasterProfile } from '../types';

export const SAMPLE_DEVICES: { id: string; name: string; category: string; image: string; data: EWasteAnalysisResult }[] = [
  {
    id: 'smartphone_s20',
    name: '삼성 갤럭시 S20 Ultra (파손품)',
    category: '스마트폰',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    data: {
      deviceIdentification: {
        brand: 'Samsung',
        model: 'Galaxy S20 Ultra 5G',
        estimatedYear: 2020,
        category: 'Mobile Phone',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      },
      extractableResources: {
        gold: { grams: 0.035, estimatedValueUsd: 2.8 },
        silver: { grams: 0.35, estimatedValueUsd: 0.35 },
        copper: { grams: 14.5, estimatedValueUsd: 0.15 },
        palladium: { grams: 0.015, estimatedValueUsd: 0.65 },
        lithium: { grams: 2.1, estimatedValueUsd: 0.4 },
        rareEarth: { grams: 1.2, estimatedValueUsd: 0.5 },
      },
      marketValueAnalysis: {
        totalEstimatedUsd: 4.85,
        totalEstimatedKrw: 6500,
        recyclingRewardKrw: 12000, // 프리미엄 자산 보상 보너스 포함
        marketTrends: '금 및 팔라듐 국제 시세 상승세 (+4.2% 이번달)',
      },
      disassemblyDifficulty: {
        score: 6,
        levelText: '보통 (방수 테이프 열풍기 가열 필요)',
        safetyPrecautions: [
          '배터리 천공 주의 (리튬 이온 화재 위험)',
          '파손된 후면 글라스 파편 방지용 장갑 착용',
          '카메라 모듈 리본 케이블 손상 주의'
        ],
        recommendedTools: ['열풍기/헤어드라이어', '흡착 컵', '플라스틱 오프닝 픽', '십자 정밀 드라이버 (+00)']
      },
      rawJsonPromptOutput: JSON.stringify({
        "device_identification": {
          "brand": "Samsung",
          "model": "Galaxy S20 Ultra 5G",
          "estimated_year": 2020,
          "category": "Smartphone"
        },
        "extractable_resources": {
          "gold_g": 0.035,
          "silver_g": 0.35,
          "copper_g": 14.5,
          "palladium_g": 0.015,
          "lithium_g": 2.1,
          "rare_earth_g": 1.2
        },
        "market_value_analysis": {
          "estimated_usd": 4.85,
          "estimated_krw": 6500,
          "market_trend": "Gold & Palladium Bullish (+4.2%)"
        },
        "disassembly_difficulty": {
          "score": 6,
          "safety_notes": ["Battery puncture risk", "Glass shards protective gloves"]
        }
      }, null, 2)
    }
  },
  {
    id: 'laptop_macbook',
    name: '애플 맥북 프로 15인치 (2017)',
    category: '노트북',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    data: {
      deviceIdentification: {
        brand: 'Apple',
        model: 'MacBook Pro 15-inch Touch Bar',
        estimatedYear: 2017,
        category: 'Laptop Computer',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
      },
      extractableResources: {
        gold: { grams: 0.28, estimatedValueUsd: 22.4 },
        silver: { grams: 1.8, estimatedValueUsd: 1.8 },
        copper: { grams: 185.0, estimatedValueUsd: 1.85 },
        palladium: { grams: 0.08, estimatedValueUsd: 3.4 },
        lithium: { grams: 12.5, estimatedValueUsd: 2.3 },
        rareEarth: { grams: 8.5, estimatedValueUsd: 3.5 },
      },
      marketValueAnalysis: {
        totalEstimatedUsd: 35.25,
        totalEstimatedKrw: 47200,
        recyclingRewardKrw: 58000,
        marketTrends: '고품위 메인보드 전극 금 함량 우수, 리사이클링 수요 최상',
      },
      disassemblyDifficulty: {
        score: 8,
        levelText: '높음 (P5 펜타로브 전용 드라이버 필요)',
        safetyPrecautions: [
          '대용량 리튬 폴리머 배터리 접착제 분리 시 화학 용제 안전 가이드 준수',
          '메인보드 잔여 전원 방전 확인',
          '정전기 방지(ESD) 밴드 착용 권장'
        ],
        recommendedTools: ['P5 펜타로브 드라이버', 'T5/T8 토크스 드라이버', '이소프로필 알코올 (99%)', '스퍼저']
      },
      rawJsonPromptOutput: JSON.stringify({
        "device_identification": {
          "brand": "Apple",
          "model": "MacBook Pro 15-inch",
          "estimated_year": 2017,
          "category": "Laptop"
        },
        "extractable_resources": {
          "gold_g": 0.28,
          "silver_g": 1.8,
          "copper_g": 185.0,
          "palladium_g": 0.08,
          "lithium_g": 12.5,
          "rare_earth_g": 8.5
        },
        "market_value_analysis": {
          "estimated_usd": 35.25,
          "estimated_krw": 47200,
          "market_trend": "High purity PCB components"
        },
        "disassembly_difficulty": {
          "score": 8,
          "safety_notes": ["P5 Pentalobe required", "Li-Po battery solvent caution"]
        }
      }, null, 2)
    }
  },
  {
    id: 'pcb_board',
    name: '산업용 서빙/서버 고품위 PCB 기판',
    category: '부품/기판',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    data: {
      deviceIdentification: {
        brand: 'Generic Server Grade',
        model: 'Dual CPU Server Motherboard',
        estimatedYear: 2018,
        category: 'High-Grade Printed Circuit Board',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      },
      extractableResources: {
        gold: { grams: 0.85, estimatedValueUsd: 68.0 },
        silver: { grams: 4.2, estimatedValueUsd: 4.2 },
        copper: { grams: 340.0, estimatedValueUsd: 3.4 },
        palladium: { grams: 0.32, estimatedValueUsd: 13.8 },
        lithium: { grams: 0.0, estimatedValueUsd: 0.0 },
        rareEarth: { grams: 15.0, estimatedValueUsd: 6.0 },
      },
      marketValueAnalysis: {
        totalEstimatedUsd: 95.4,
        totalEstimatedKrw: 128000,
        recyclingRewardKrw: 145000,
        marketTrends: '금 도금 핀 및 팔라듐 캐패시터 집중 분포 (최고 등급 광석 가치)',
      },
      disassemblyDifficulty: {
        score: 3,
        levelText: '쉬움 (단순 소켓 및 소자 분리)',
        safetyPrecautions: [
          '날카로운 기판 절단면 장극 방지용 산업용 장갑',
          '납/중금속 먼지 흡입 방지 마스크 착용'
        ],
        recommendedTools: ['열풍 디솔더링 건', '사이드 니퍼', '보호안경']
      },
      rawJsonPromptOutput: JSON.stringify({
        "device_identification": {
          "brand": "Generic Server Grade",
          "model": "Dual CPU Server Motherboard",
          "estimated_year": 2018,
          "category": "High-Grade PCB"
        },
        "extractable_resources": {
          "gold_g": 0.85,
          "silver_g": 4.2,
          "copper_g": 340.0,
          "palladium_g": 0.32,
          "lithium_g": 0.0,
          "rare_earth_g": 15.0
        },
        "market_value_analysis": {
          "estimated_usd": 95.4,
          "estimated_krw": 128000,
          "market_trend": "Top Grade Urban Ore PCB"
        },
        "disassembly_difficulty": {
          "score": 3,
          "safety_notes": ["Sharp PCB edge gloves", "Dust mask for lead solder"]
        }
      }, null, 2)
    }
  }
];

export const INITIAL_METRICS: MetricsData = {
  pageViews: 14890, // 단순 방문자 (허무 지표)
  analyzedCount: 3420,
  valueHypothesisClickRate: 64.8, // % (내 기기 판매하기 / 상세 리포트 클릭)
  growthHypothesisShares: 1280, // 바이럴 리포트 공유 횟수
  viralCoefficient: 1.42, // K-Factor (> 1.0 성장)
  pickupConversionRate: 38.5, // % 실제 수거/회수 신청 완료 전환율
  totalRecycledAssetKrw: 145800000 // 총 회수 자산 가치
};

export const COMMUNITY_MASTERS: MasterProfile[] = [
  {
    id: 'm1',
    name: '김광산 (GoldExtractor)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=GoldExtractor',
    rankTitle: '👑 도시광산 전설 킹',
    rankLevel: 5,
    totalMetalGrams: 142.5,
    recycledAssetsKrw: 4850000,
    badges: ['금 100g 획득', '구형 서버 50대', '환경보호 훈장'],
    tipShared: '구형 RAM 메인 핑거 부위는 질산 화학 반응 없이 열풍 분리로 금 박막만 깔끔하게 회수 가능합니다!',
    likes: 342
  },
  {
    id: 'm2',
    name: '에코루나팬 (EcoRecycler)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=EcoRecycler',
    rankTitle: '🥇 플래티넘 채굴자',
    rankLevel: 4,
    totalMetalGrams: 78.2,
    recycledAssetsKrw: 2310000,
    badges: ['스마트폰 100대 수거', '팔라듐 마스터'],
    tipShared: '2015년 이전 스마트폰 카메라인 센서 부근에 팔라듐 합금이 많이 사용되었습니다. 절대 버리지 마세요!',
    likes: 189
  },
  {
    id: 'm3',
    name: '초보마이너 (GreenMiner)',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=GreenMiner',
    rankTitle: '🥉 실버 수집가',
    rankLevel: 2,
    totalMetalGrams: 14.8,
    recycledAssetsKrw: 420000,
    badges: ['첫 분석 완료', '루나 단골'],
    tipShared: '집 장롱 속에 자고 있던 맥북 2대를 루나로 조회해보니 10만원이 훌쩍 넘네요. 당장 수거 신청했습니다.',
    likes: 76
  }
];
