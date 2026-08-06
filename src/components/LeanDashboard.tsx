import React from 'react';
import { MetricsData } from '../types';
import { BarChart3, TrendingUp, Share2, DollarSign, EyeOff, Target, ShieldAlert, Zap, ArrowUpRight } from 'lucide-react';

interface LeanDashboardProps {
  metrics: MetricsData;
}

export const LeanDashboard: React.FC<LeanDashboardProps> = ({ metrics }) => {
  return (
    <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 20px' }}>
      {/* Title & Philosophy Banner */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '32px', borderLeft: '4px solid #f59e0b' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <EyeOff size={14} /> 허무 지표(Vanity Metrics) 전면 배제
              </span>
              <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>위저드 오브 오즈 & 혁신 회계 (Innovation Accounting)</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              린 스타트업 <span className="gradient-text-gold">MVP 검증 & 실행 지표</span> 대시보드
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginTop: '4px' }}>
              단순 페이지 조회수 대신 제품-시장의 적합성(PMF)을 보여주는 실제 유저의 전환 행위와 바이럴 계수를 실시간 측정합니다.
            </p>
          </div>

          <div style={{ background: 'rgba(5, 8, 15, 0.8)', padding: '12px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>회수 창출 자산 총액</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
              {(metrics.totalRecycledAssetKrw / 10000).toLocaleString()} 만원
            </div>
          </div>
        </div>
      </div>

      {/* Top Metric Cards: Top Priority Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {/* Metric 1: Value Hypothesis Verification */}
        <div className="glass-card-gold" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#fef08a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Target size={16} /> 1. 가치 가설 (Value Hypothesis)
            </span>
            <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              목표 50% 초과
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '14px' }}>
            사진 분석 후 '내 기기 판매하기' 및 '상세 리포트' 클릭 비율
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
              {metrics.valueHypothesisClickRate}%
            </span>
            <span style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={16} /> +12.4% 상승
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${metrics.valueHypothesisClickRate}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Metric 2: Growth Hypothesis Verification */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Share2 size={16} /> 2. 성장 가설 (Growth Hypothesis)
            </span>
            <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              자체 바이럴 엔진
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '14px' }}>
            자산 리포트 공유 횟수 및 바이럴 K-factor (K &gt; 1.0 시 폭발적 성장)
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff' }}>
              K = {metrics.viralCoefficient}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#06b6d4' }}>
              ({metrics.growthHypothesisShares.toLocaleString()}회 공유)
            </span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(metrics.viralCoefficient * 50, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #06b6d4, #38bdf8)', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Metric 3: Actionable Conversion Rate (Excluding Vanity Metrics) */}
        <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={16} /> 3. 핵심 실행 수거 전환율
            </span>
            <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '2px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
              최우선 KPI
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '14px' }}>
            단순 방문자가 아닌 기기 가치 조회 후 실제 수거 신청으로 이어진 비율
          </p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981' }}>
              {metrics.pickupConversionRate}%
            </span>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              (분석 {metrics.analyzedCount.toLocaleString()}건 중)
            </span>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${metrics.pickupConversionRate}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '4px' }} />
          </div>
        </div>
      </div>

      {/* Comparison Section: Actionable Metrics vs Vanity Metrics */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 color="#f59e0b" size={20} />
          <span>실행 지표(Actionable Metrics) vs 허무 지표(Vanity Metrics) 대조표</span>
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
                <th style={{ padding: '12px' }}>측정 분류</th>
                <th style={{ padding: '12px' }}>구분 항목</th>
                <th style={{ padding: '12px' }}>수치 / 결과</th>
                <th style={{ padding: '12px' }}>린 스타트업 의사결정 시사점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(239, 68, 68, 0.04)' }}>
                <td style={{ padding: '14px', color: '#f87171', fontWeight: 700 }}>❌ 허무 지표</td>
                <td style={{ padding: '14px' }}>단순 웹 방문자 수 (Page Views)</td>
                <td style={{ padding: '14px', color: '#9ca3af' }}>{metrics.pageViews.toLocaleString()} 회</td>
                <td style={{ padding: '14px', color: '#6b7280', fontSize: '0.85rem' }}>
                  방문자 수가 높아도 실제 자원 회수가 이루어지지 않으면 사업성 무의미. 최우선 순위에서 제외.
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(16, 185, 129, 0.06)' }}>
                <td style={{ padding: '14px', color: '#10b981', fontWeight: 700 }}>✅ 실행 지표 1</td>
                <td style={{ padding: '14px', fontWeight: 600 }}>가치가설: 상세 리포트 / 판매 클릭율</td>
                <td style={{ padding: '14px', color: '#f59e0b', fontWeight: 800 }}>{metrics.valueHypothesisClickRate}%</td>
                <td style={{ padding: '14px', color: '#d1d5db', fontSize: '0.85rem' }}>
                  사용자가 내 가전 속 금속 자산 가격을 확인한 후 '경제적 유인'을 강력히 느꼈음을 증명.
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(16, 185, 129, 0.06)' }}>
                <td style={{ padding: '14px', color: '#10b981', fontWeight: 700 }}>✅ 실행 지표 2</td>
                <td style={{ padding: '14px', fontWeight: 600 }}>성장가설: 자산 리포트 바이럴 공유 (K-factor)</td>
                <td style={{ padding: '14px', color: '#06b6d4', fontWeight: 800 }}>K = {metrics.viralCoefficient}</td>
                <td style={{ padding: '14px', color: '#d1d5db', fontSize: '0.85rem' }}>
                  유저 1명이 평균 1.42명의 새로운 유저를 불러오고 있어 광고비 없이 유기적 성장 가설 달성.
                </td>
              </tr>
              <tr style={{ background: 'rgba(16, 185, 129, 0.06)' }}>
                <td style={{ padding: '14px', color: '#10b981', fontWeight: 700 }}>✅ 핵심 지표 3</td>
                <td style={{ padding: '14px', fontWeight: 600 }}>수거 및 회수 완료 최종 전환율</td>
                <td style={{ padding: '14px', color: '#10b981', fontWeight: 800 }}>{metrics.pickupConversionRate}%</td>
                <td style={{ padding: '14px', color: '#d1d5db', fontSize: '0.85rem' }}>
                  위저드 오브 오즈 가상 수거 단계에서 실제로 자산을 전달하려는 핵심 충성 유저 비중.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
