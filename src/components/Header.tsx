import React from 'react';
import { Cpu, Bot, BarChart3, Users, Pickaxe } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scanner' | 'luna' | 'dashboard' | 'community';
  setActiveTab: (tab: 'scanner' | 'luna' | 'dashboard' | 'community') => void;
  accumulatedKrw: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, accumulatedKrw }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '16px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('scanner')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)'
          }}>
            <Pickaxe size={24} color="#0b0f19" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              <span className="gradient-text-gold">도시광산</span> <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 500 }}>Urban Mining AI</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>멀티모달 폐가전 자원 평가 & 에코 컴패니언</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setActiveTab('scanner')}
            className={activeTab === 'scanner' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Cpu size={18} />
            <span>AI 비주얼 식별기</span>
          </button>

          <button
            onClick={() => setActiveTab('luna')}
            className={activeTab === 'luna' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem', position: 'relative' }}
          >
            <Bot size={18} />
            <span>AI 루나 (어드바이저)</span>
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }} />
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <BarChart3 size={18} />
            <span>MVP 검증 대시보드</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={activeTab === 'community' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            <Users size={18} />
            <span>마스터들의 마을</span>
          </button>
        </nav>

        {/* User Summary Widget */}
        <div className="glass-card-gold" style={{ padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: '#fef08a' }}>내 도시광산 누적자산</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
            {accumulatedKrw.toLocaleString()} 원
          </span>
        </div>
      </div>
    </header>
  );
};
