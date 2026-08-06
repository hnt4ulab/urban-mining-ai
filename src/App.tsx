import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { EWasteAnalysisResult, UserMemory, MetricsData } from './types';
import { SAMPLE_DEVICES, INITIAL_METRICS } from './data/mockData';
import { Header } from './components/Header';
import { VisionScanner } from './components/VisionScanner';
import { LunaAdvisor } from './components/LunaAdvisor';
import { LeanDashboard } from './components/LeanDashboard';
import { TownCommunity } from './components/TownCommunity';

export function App() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'luna' | 'dashboard' | 'community'>('scanner');
  const [currentAnalysis, setCurrentAnalysis] = useState<EWasteAnalysisResult | null>(SAMPLE_DEVICES[0].data);
  
  // User memory state (companion-app memory feature)
  const [userMemory, setUserMemory] = useState<UserMemory>({
    totalScannedDevices: 1,
    totalAccumulatedKrw: 6500,
    deviceHistory: [
      { name: '삼성 갤럭시 S20 Ultra', date: '2026-08-06', valueKrw: 6500 }
    ]
  });

  // Metrics state (Innovation Accounting)
  const [metrics, setMetrics] = useState<MetricsData>(INITIAL_METRICS);

  const handleAnalysisComplete = (result: EWasteAnalysisResult) => {
    setCurrentAnalysis(result);
    
    // Memory update
    setUserMemory((prev) => {
      const exists = prev.deviceHistory.some(d => d.name === result.deviceIdentification.model);
      if (exists) return prev;
      
      const newReward = result.marketValueAnalysis.recyclingRewardKrw;
      return {
        totalScannedDevices: prev.totalScannedDevices + 1,
        totalAccumulatedKrw: prev.totalAccumulatedKrw + newReward,
        deviceHistory: [
          { name: `${result.deviceIdentification.brand} ${result.deviceIdentification.model}`, date: new Date().toISOString().split('T')[0], valueKrw: newReward },
          ...prev.deviceHistory
        ]
      };
    });

    setMetrics((prev) => ({
      ...prev,
      analyzedCount: prev.analyzedCount + 1
    }));
  };

  const handleNavigateToLuna = (result: EWasteAnalysisResult) => {
    setCurrentAnalysis(result);
    setActiveTab('luna');
  };

  const handleConfirmPickup = (deviceValueKrw: number) => {
    // Confetti celebration animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setMetrics((prev) => {
      const newAnalyzed = prev.analyzedCount;
      const newConversion = Math.min(Number((prev.pickupConversionRate + 0.1).toFixed(1)), 100);
      return {
        ...prev,
        pickupConversionRate: newConversion,
        totalRecycledAssetKrw: prev.totalRecycledAssetKrw + deviceValueKrw
      };
    });
  };

  const handleIncrementMetric = (type: 'valueHypothesis' | 'growthShares') => {
    setMetrics((prev) => {
      if (type === 'valueHypothesis') {
        return {
          ...prev,
          valueHypothesisClickRate: Math.min(Number((prev.valueHypothesisClickRate + 0.2).toFixed(1)), 100)
        };
      } else {
        const newShares = prev.growthHypothesisShares + 1;
        return {
          ...prev,
          growthHypothesisShares: newShares,
          viralCoefficient: Number((prev.viralCoefficient + 0.01).toFixed(2))
        };
      }
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accumulatedKrw={userMemory.totalAccumulatedKrw}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'scanner' && (
          <VisionScanner
            onAnalysisComplete={handleAnalysisComplete}
            onNavigateToLuna={handleNavigateToLuna}
            onIncrementMetric={handleIncrementMetric}
          />
        )}

        {activeTab === 'luna' && (
          <LunaAdvisor
            currentAnalysis={currentAnalysis}
            userMemory={userMemory}
            onConfirmPickup={handleConfirmPickup}
            onIncrementMetric={handleIncrementMetric}
          />
        )}

        {activeTab === 'dashboard' && (
          <LeanDashboard metrics={metrics} />
        )}

        {activeTab === 'community' && (
          <TownCommunity />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: '#6b7280',
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        marginTop: '60px'
      }}>
        © 2026 Urban Mining AI Project. 도시광산 비주얼 식별 프롬프트 & 에코 루나 컴패니언 & 린스타트업 대시보드
      </footer>
    </div>
  );
}

export default App;
