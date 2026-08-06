import React, { useState } from 'react';
import { EWasteAnalysisResult } from '../types';
import { SAMPLE_DEVICES } from '../data/mockData';
import { Upload, Sparkles, AlertTriangle, ShieldCheck, DollarSign, Coins, Code, Share2, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface VisionScannerProps {
  onAnalysisComplete: (result: EWasteAnalysisResult) => void;
  onNavigateToLuna: (result: EWasteAnalysisResult) => void;
  onIncrementMetric: (type: 'valueHypothesis' | 'growthShares') => void;
}

export const VisionScanner: React.FC<VisionScannerProps> = ({
  onAnalysisComplete,
  onNavigateToLuna,
  onIncrementMetric
}) => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_DEVICES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<EWasteAnalysisResult | null>(SAMPLE_DEVICES[0].data);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // 시뮬레이션 분석 시작
  const handleStartAnalysis = (sample = selectedSample) => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const res = customImage ? {
        ...sample.data,
        deviceIdentification: {
          ...sample.data.deviceIdentification,
          imageUrl: customImage
        }
      } : sample.data;
      
      setScanResult(res);
      onAnalysisComplete(res);
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCustomImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyJson = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult.rawJsonPromptOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 20px' }}>
      {/* Intro Banner */}
      <div className="glass-card-gold" style={{ padding: '28px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              멀티모달 비주얼 AI 모델 v3.5
            </span>
            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>multi-modal-starter-kit 연동</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            버려지는 폐가전 속 숨겨진 <span className="gradient-text-gold">희귀 금속과 자산 가치</span>를 측정하세요
          </h2>
          <p style={{ color: '#d1d5db', maxWidth: '720px', lineHeight: 1.6, fontSize: '0.95rem' }}>
            "당신은 세계 최고의 도시광산 기술 전문가입니다." 프롬프트로 미세 정밀 기기 식별, 6대 희귀 금속(금·은·구리·팔라듐·리튬·희토류) 규격 측정 및 실시간 시장 가치와 분해 안전 가이드를 생성합니다.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px', alignItems: 'start' }}>
        {/* Left Column: Upload & Sample Selection */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={20} color="#f59e0b" />
            <span>폐가전 사진/영상 업로드</span>
          </h3>

          {/* Drag & Drop Upload Zone */}
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            border: '2px dashed rgba(245, 158, 11, 0.4)',
            borderRadius: '16px',
            background: 'rgba(5, 8, 15, 0.5)',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <input type="file" accept="image/*,video/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            {customImage ? (
              <img src={customImage} alt="Uploaded preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto'
                }}>
                  <Upload size={24} color="#f59e0b" />
                </div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>사진 또는 촬영 영상을 클릭하여 선택</p>
                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>스마트폰, 메인보드, 파손된 노트북 등 지원</p>
              </div>
            )}
          </label>

          {/* Sample Presets Selection */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 600, marginBottom: '10px' }}>
              또는 샘플 데이터로 테스트하기:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {SAMPLE_DEVICES.map((dev) => (
                <button
                  key={dev.id}
                  onClick={() => {
                    setCustomImage(null);
                    setSelectedSample(dev);
                    handleStartAnalysis(dev);
                  }}
                  style={{
                    background: selectedSample.id === dev.id && !customImage ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedSample.id === dev.id && !customImage ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={dev.image} alt={dev.name} style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '8px', marginBottom: '6px' }} />
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f3f4f6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {dev.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleStartAnalysis(selectedSample)}
            disabled={isScanning}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
          >
            {isScanning ? (
              <>
                <Sparkles className="spin-animation" size={20} />
                <span>도시광산 AI 비주얼 분석 중...</span>
              </>
            ) : (
              <>
                <Zap size={20} />
                <span>폐가전 자원 식별 정밀 분석 실행</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Analysis Result Display */}
        <div>
          {isScanning && (
            <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', position: 'relative' }}>
              <div className="scanner-overlay" />
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Sparkles size={36} color="#f59e0b" className="pulse-animation" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>멀티모달 딥러닝 비주얼 추출 엔진 작동 중</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>기기 외형 레이어 복원 / 회로 기판 광물 함량 데이터베이스 대조 중...</p>
            </div>
          )}

          {!isScanning && scanResult && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Top Header Card */}
              <div className="glass-card-gold" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 700 }}>[1. 기기 식별 완료]</span>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '2px' }}>
                      {scanResult.deviceIdentification.brand} {scanResult.deviceIdentification.model}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#d1d5db' }}>
                      제조 추정 연도: {scanResult.deviceIdentification.estimatedYear}년 | 카테고리: {scanResult.deviceIdentification.category}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowJsonModal(true)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Code size={14} />
                    <span>JSON 프롬프트 결과</span>
                  </button>
                </div>

                {/* Market Value Highlights */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  background: 'rgba(11, 15, 25, 0.6)',
                  padding: '16px',
                  borderRadius: '14px',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>[3. 추정 순금속 자산 가치]</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                      ${scanResult.marketValueAnalysis.totalEstimatedUsd} <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>USD</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#e5e7eb' }}>
                      (약 {scanResult.marketValueAnalysis.totalEstimatedKrw.toLocaleString()}원)
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>[최대 보상 수거가]</span>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>
                      {scanResult.marketValueAnalysis.recyclingRewardKrw.toLocaleString()}원
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {scanResult.marketValueAnalysis.marketTrends}
                    </div>
                  </div>
                </div>
              </div>

              {/* Extractable Resources Grid */}
              <div className="glass-card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: '#fef08a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Coins size={18} color="#f59e0b" />
                  <span>[2. 추출 가능 표준 희귀 금속 함량]</span>
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <ResourceBox name="순금 (Au)" grams={scanResult.extractableResources.gold.grams} usd={scanResult.extractableResources.gold.estimatedValueUsd} color="#f59e0b" />
                  <ResourceBox name="순은 (Ag)" grams={scanResult.extractableResources.silver.grams} usd={scanResult.extractableResources.silver.estimatedValueUsd} color="#e5e7eb" />
                  <ResourceBox name="구리 (Cu)" grams={scanResult.extractableResources.copper.grams} usd={scanResult.extractableResources.copper.estimatedValueUsd} color="#b45309" />
                  <ResourceBox name="팔라듐 (Pd)" grams={scanResult.extractableResources.palladium.grams} usd={scanResult.extractableResources.palladium.estimatedValueUsd} color="#8b5cf6" />
                  <ResourceBox name="리튬 (Li)" grams={scanResult.extractableResources.lithium.grams} usd={scanResult.extractableResources.lithium.estimatedValueUsd} color="#06b6d4" />
                  <ResourceBox name="희토류 (Nd)" grams={scanResult.extractableResources.rareEarth.grams} usd={scanResult.extractableResources.rareEarth.estimatedValueUsd} color="#10b981" />
                </div>
              </div>

              {/* Disassembly & Safety Warning */}
              <div className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={18} color="#10b981" />
                    <span>[4. 셀프 분해 난이도 및 안전 가이드]</span>
                  </h4>
                  <span style={{
                    background: scanResult.disassemblyDifficulty.score > 6 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: scanResult.disassemblyDifficulty.score > 6 ? '#f87171' : '#34d399',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    난이도: {scanResult.disassemblyDifficulty.score} / 10 ({scanResult.disassemblyDifficulty.levelText})
                  </span>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertTriangle size={16} /> 안전 주의사항
                  </p>
                  <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', color: '#d1d5db', lineHeight: 1.5 }}>
                    {scanResult.disassemblyDifficulty.safetyPrecautions.map((safe, idx) => (
                      <li key={idx}>{safe}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    onIncrementMetric('valueHypothesis');
                    onNavigateToLuna(scanResult);
                  }}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>AI 루나와 보물 자산 상담하기</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => {
                    onIncrementMetric('growthShares');
                    alert('자산 분석 결과 공유 링크가 복사되었습니다! (바이럴 K-factor 지표 반영 완료)');
                  }}
                  className="btn-emerald"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Share2 size={18} />
                  <span>친구에게 이 가치 공유하기</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RAW JSON Prompt Output Modal */}
      {showJsonModal && scanResult && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '24px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code color="#f59e0b" size={20} />
                <span>멀티모달 식별 프롬프트 JSON 결과물</span>
              </h3>
              <button onClick={() => setShowJsonModal(false)} className="btn-secondary" style={{ padding: '4px 10px' }}>✕</button>
            </div>
            
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '12px' }}>
              요구사항 프롬프트 규격(1. 기기 식별, 2. 추출 가능 자원, 3. 시장 가치 분석, 4. 분해 난이도)에 의해 생성된 표준 JSON 구조입니다.
            </p>

            <pre className="json-code" style={{ flex: 1, overflowY: 'auto' }}>
              {scanResult.rawJsonPromptOutput}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={handleCopyJson} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                {copied ? <CheckCircle2 size={16} /> : <Code size={16} />}
                <span>{copied ? '복사 완료!' : 'JSON 복사하기'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResourceBox: React.FC<{ name: string; grams: number; usd: number; color: string }> = ({ name, grams, usd, color }) => (
  <div style={{ background: 'rgba(5, 8, 15, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '12px', borderRadius: '12px' }}>
    <span style={{ fontSize: '0.75rem', color: color, fontWeight: 700 }}>{name}</span>
    <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: '#ffffff' }}>
      {grams}g
    </div>
    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
      ≈ ${usd}
    </div>
  </div>
);
