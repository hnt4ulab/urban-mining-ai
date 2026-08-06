import React, { useState } from 'react';
import { MasterProfile } from '../types';
import { COMMUNITY_MASTERS } from '../data/mockData';
import { Users, Crown, Award, ThumbsUp, MessageSquare, PlusCircle, Sparkles, Shield, Heart } from 'lucide-react';

export const TownCommunity: React.FC = () => {
  const [masters, setMasters] = useState<MasterProfile[]>(COMMUNITY_MASTERS);
  const [newTip, setNewTip] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleLike = (id: string) => {
    setMasters((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleAddTip = () => {
    if (!newTip.trim()) return;

    const myProfile: MasterProfile = {
      id: `m_${Date.now()}`,
      name: '나 (마스터 채굴자)',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=MyMasterAvatar',
      rankTitle: '🥇 플래티넘 리사이클러',
      rankLevel: 3,
      totalMetalGrams: 34.2,
      recycledAssetsKrw: 1050000,
      badges: ['신규 마스터', '팁 공유자'],
      tipShared: newTip,
      likes: 1
    };

    setMasters([myProfile, ...masters]);
    setNewTip('');
    setShowAddModal(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '32px auto', padding: '0 20px' }}>
      {/* Community Header Banner */}
      <div className="glass-card-gold" style={{ padding: '28px', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                ai-town 오픈소스 멀티아바타 응용
              </span>
              <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>1,000명의 진정한 팬(True Fans) 커뮤니티</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              도시광산 <span className="gradient-text-gold">마스터들의 마을 (AI Town)</span>
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginTop: '4px', maxWidth: '680px' }}>
              수집한 희귀 금속 양에 따라 마을 등급이 상승합니다! 마스터들과 직접적인 관계(Direct Relationship)를 맺고 나만의 자산 노하우 팁을 공유하세요.
            </p>
          </div>

          <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '12px 20px' }}>
            <PlusCircle size={18} />
            <span>내 노하우 팁 공유하기</span>
          </button>
        </div>
      </div>

      {/* AI Town Virtual Map Overview Simulation */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px', position: 'relative', background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, rgba(11, 15, 25, 0.9) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles color="#f59e0b" size={20} />
            <span>마을 실시간 활성화 광장 (AI Town Plaza)</span>
          </h3>
          <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            마스터 342명 상주 중
          </span>
        </div>

        {/* Avatar Grid Simulation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          padding: '16px',
          background: 'rgba(5, 8, 15, 0.6)',
          borderRadius: '16px',
          border: '1px dashed rgba(245, 158, 11, 0.3)'
        }}>
          {masters.map((m) => (
            <div key={m.id} style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '14px',
              padding: '14px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <img src={m.avatar} alt={m.name} style={{ width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 10px auto', background: 'rgba(245, 158, 11, 0.2)', padding: '4px' }} />
              <div style={{ fontSize: '0.75rem', color: '#fef08a', fontWeight: 700, marginBottom: '2px' }}>{m.rankTitle}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{m.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                희귀 금속 {m.totalMetalGrams}g 수집
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard & Direct Knowledge Feed Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
        {/* Left Column: Direct Relationship Feed */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare color="#06b6d4" size={22} />
            <span>희귀 금속 추출 노하우 & 자산 공유 피드</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {masters.map((m) => (
              <div key={m.id} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={m.avatar} alt={m.name} style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)' }} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{m.name}</span>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '2px 6px', borderRadius: '6px' }}>
                          Lv.{m.rankLevel}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{m.rankTitle}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(m.id)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
                  >
                    <ThumbsUp size={14} color="#f59e0b" />
                    <span>좋아요 {m.likes}</span>
                  </button>
                </div>

                {/* Tip Content */}
                <div style={{ background: 'rgba(5, 8, 15, 0.6)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', lineHeight: 1.6, color: '#e5e7eb', marginBottom: '12px' }}>
                  "{m.tipShared}"
                </div>

                {/* Badges & Stats */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {m.badges.map((badge, bIdx) => (
                      <span key={bIdx} style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '10px' }}>
                        🏷️ {badge}
                      </span>
                    ))}
                  </div>

                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    회수 자산: <strong style={{ color: '#fef08a' }}>{m.recycledAssetsKrw.toLocaleString()}원</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Master Ranks & Gamification System */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crown color="#f59e0b" size={22} />
            <span>도시광산 자산 등급 체계</span>
          </h3>

          <div className="glass-card" style={{ padding: '20px' }}>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
              자원 수거량이 증가함에 따라 더 높은 희귀 금속 등급과 커뮤니티 전용 혜택을 획득합니다.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <RankLevelItem title="👑 도시광산 전설 킹" minGrams="100g 이상" reward="에코 보너스 정산비 15% 추가" active={true} />
              <RankLevelItem title="🥇 플래티넘 연금술사" minGrams="50g ~ 100g" reward="무료 정밀 분해 세트 증정" active={false} />
              <RankLevelItem title="🥈 골드 리사이클러" minGrams="20g ~ 50g" reward="우선 수거 기사 배치" active={false} />
              <RankLevelItem title="🥉 실버 채굴자" minGrams="5g ~ 20g" reward="루나 1:1 맞춤 컨설팅" active={false} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Tip Modal */}
      {showAddModal && (
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
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
              나만의 희귀 금속 추출 노하우 공유하기
            </h3>
            <textarea
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              placeholder="예: 구형 메인보드의 커넥터 부위 도금 추출 팁이나 안전 분해 노하우를 공유해보세요!"
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(5, 8, 15, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">취소</button>
              <button onClick={handleAddTip} className="btn-primary">마을 피드에 등록하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RankLevelItem: React.FC<{ title: string; minGrams: string; reward: string; active: boolean }> = ({ title, minGrams, reward, active }) => (
  <div style={{
    background: active ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
    border: active ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: active ? '#fef08a' : '#f3f4f6' }}>{title}</div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{reward}</div>
    </div>
    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>{minGrams}</span>
  </div>
);
