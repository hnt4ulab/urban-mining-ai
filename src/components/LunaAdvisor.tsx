import React, { useState, useEffect } from 'react';
import { EWasteAnalysisResult, ChatMessage, UserMemory } from '../types';
import { Bot, Send, Sparkles, History, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2, Gift } from 'lucide-react';

interface LunaAdvisorProps {
  currentAnalysis: EWasteAnalysisResult | null;
  userMemory: UserMemory;
  onConfirmPickup: (deviceValueKrw: number) => void;
  onIncrementMetric: (type: 'valueHypothesis') => void;
}

export const LunaAdvisor: React.FC<LunaAdvisorProps> = ({
  currentAnalysis,
  userMemory,
  onConfirmPickup,
  onIncrementMetric
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 루나 초기 대화 세팅 (요구사항 프롬프트 exact match 포함)
  useEffect(() => {
    const initialMsgs: ChatMessage[] = [];

    // 1. 메모리 회상 인사 메시지 ( past memory check )
    if (userMemory.deviceHistory.length > 0) {
      initialMsgs.push({
        id: 'msg_mem',
        sender: 'luna',
        text: `안녕하세요! 다시 오셨군요! 🌿 지난번 조회하셨던 ${userMemory.deviceHistory[0].name}까지 합치면 벌써 **${userMemory.totalAccumulatedKrw.toLocaleString()}원**의 가치를 모으셨네요! 오늘 버리려던 기기도 숨겨진 보물인지 제가 당장 확인해 드릴게요! ✨`,
        timestamp: '방금 전'
      });
    } else {
      initialMsgs.push({
        id: 'msg_welcome',
        sender: 'luna',
        text: `반가워요! 저는 당신의 폐가전을 반짝이는 보물로 바꿔주는 에코 자산 컨설턴트 **루나**예요! 🌟 집안 구석에 잠자고 있는 옛날 스마트폰이나 파손된 노트북 사진을 보여주시면 금, 은, 팔라듐 자산 가치를 바로 계산해 드릴게요!`,
        timestamp: '방금 전'
      });
    }

    // 2. 현재 조회된 기기가 있는 경우 핵심 임무 프롬프트 적용
    if (currentAnalysis) {
      const goldG = currentAnalysis.extractableResources.gold.grams;
      const krw = currentAnalysis.marketValueAnalysis.recyclingRewardKrw;
      const devName = `${currentAnalysis.deviceIdentification.brand} ${currentAnalysis.deviceIdentification.model}`;

      initialMsgs.push({
        id: 'msg_current_dev',
        sender: 'luna',
        text: `우와! 방금 분석하신 **${devName}** 기기를 확인했어요! 📱\n이 기기 안에는 약 **${goldG}g의 순금**과 팔라듐이 들어있어요! 현재 시세와 에코 보너스를 합쳐 약 **${krw.toLocaleString()}원** 정도의 가치네요! 💎\n\n그냥 서랍에 두면 쓰레기가 되지만, 저희 도시광산으로 회수하면 지구가 깨끗해지고 통장도 든든해져요!`,
        timestamp: '방금 전',
        actionButtons: [
          { label: '📦 지금 바로 무료 수거 신청하기', action: 'pickup' },
          { label: '💡 안전하게 셀프 분해 팁 보기', action: 'safety' }
        ],
        highlightAsset: {
          device: devName,
          goldGrams: goldG,
          valueKrw: krw
        }
      });
    }

    setMessages(initialMsgs);
  }, [currentAnalysis, userMemory]);

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: '방금 전'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 루나 응답 시뮬레이션
    setTimeout(() => {
      let replyText = '궁금한 점이 있으시다면 언제든 물어보세요! 환경을 보호하고 가치를 창출하는 도시광산 투어는 언제나 즐거워요 🌿';
      
      if (textToSend.includes('수거') || textToSend.includes('판매') || textToSend.includes('신청')) {
        replyText = '최고의 선택이에요! 🚚 택배 기사님이 무료로 찾아가서 기기를 회수하고, 검수 완료 즉시 계좌로 정산금이 입금됩니다. 아래 버튼을 눌러 확정해주세요!';
      } else if (textToSend.includes('환경') || textToSend.includes('이익')) {
        replyText = '맞아요! 폐가전을 그냥 매립하면 온실가스와 중금속 오염을 유발하지만, 1대의 스마트폰을 재활용하면 CO2 약 2.4kg 배출을 줄일 수 있어요! 🌍 탄소 중립에 기여하시는 거예요!';
      } else if (textToSend.includes('금') || textToSend.includes('시세')) {
        replyText = '현재 국제 금 시세는 g당 약 85,000원 선으로 지속적인 우상향 중이에요! 특히 서버나 정밀 기기의 금 도금 피복은 순도가 높아 가치가 매우 뛰어납니다! 💰';
      }

      const lunaReply: ChatMessage = {
        id: `luna_${Date.now()}`,
        sender: 'luna',
        text: replyText,
        timestamp: '방금 전',
        actionButtons: textToSend.includes('수거') ? [{ label: '🚚 수거 예약 확정하기', action: 'pickup' }] : undefined
      };

      setMessages((prev) => [...prev, lunaReply]);
      setIsTyping(false);
    }, 1200);
  };

  const handleActionButton = (action: string) => {
    if (action === 'pickup') {
      onIncrementMetric('valueHypothesis');
      const val = currentAnalysis ? currentAnalysis.marketValueAnalysis.recyclingRewardKrw : 12000;
      onConfirmPickup(val);
      
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_${Date.now()}`,
          sender: 'luna',
          text: `🎉 축하합니다! 무료 수거 신청이 접수되었습니다. [전환율 +1 상승!]\n입금 예정 금액: **${val.toLocaleString()}원**이 예약되었습니다!`,
          timestamp: '방금 전'
        }
      ]);
    } else if (action === 'safety') {
      setMessages((prev) => [
        ...prev,
        {
          id: `sys_${Date.now()}`,
          sender: 'luna',
          text: `🛡️ **안전 가이드**: 분해 시 전원 배터리 분리가 최우선입니다. 열풍기로 테두리 접착제를 녹인 후 플라스틱 헤라로 천천히 분리하세요. 장갑 착용 필수!`,
          timestamp: '방금 전'
        }
      ]);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '32px auto', padding: '0 20px' }}>
      {/* Advisor Header Banner */}
      <div className="glass-card-gold" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            <Bot size={32} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              AI 에코 어드바이저 <span className="gradient-text-emerald">'루나'</span>
            </h2>
            <p style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
              `companion-app` 기반 장기 메모리 탑재 | 경제적 이익 & 환경 보호 가치 컨설턴트
            </p>
          </div>
        </div>

        {/* Memory Stats Box */}
        <div style={{ background: 'rgba(11, 15, 25, 0.6)', padding: '12px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <History size={14} color="#f59e0b" /> 루나의 메모리 지식 뱅크
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fef08a' }}>
            조회한 총 보물 자산: {userMemory.totalAccumulatedKrw.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-card" style={{ height: '580px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Message Log */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                gap: '12px',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {msg.sender === 'luna' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={20} color="#ffffff" />
                </div>
              )}

              <div>
                <div style={{
                  background: msg.sender === 'user' 
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'rgba(255, 255, 255, 0.06)',
                  color: msg.sender === 'user' ? '#0b0f19' : '#f3f4f6',
                  padding: '14px 18px',
                  borderRadius: msg.sender === 'user' ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                  border: msg.sender === 'luna' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>

                {/* Highlight Asset Card Attachment */}
                {msg.highlightAsset && (
                  <div style={{
                    marginTop: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Gift size={18} color="#10b981" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{msg.highlightAsset.device}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981' }}>
                      +{msg.highlightAsset.valueKrw.toLocaleString()}원 가치 발견
                    </span>
                  </div>
                )}

                {/* Action Suggestion Buttons */}
                {msg.actionButtons && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {msg.actionButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionButton(btn.action)}
                        className="btn-emerald"
                        style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}

                <span style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px', display: 'block', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#9ca3af', fontSize: '0.85rem' }}>
              <Bot size={18} color="#10b981" />
              <span>루나가 메시지를 작성 중입니다...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 24px', background: 'rgba(5, 8, 15, 0.8)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="루나에게 폐가전 가치, 수거 방법, 환경 기여도에 대해 물어보세요..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '12px 20px' }}>
              <Send size={18} />
              <span>전송</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
