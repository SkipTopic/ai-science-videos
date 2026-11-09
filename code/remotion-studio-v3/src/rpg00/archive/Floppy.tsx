import React from 'react';

export const Floppy: React.FC<{
  size: number;
  rotation?: number;
  label?: string;
  sublabel?: string;
  handwritten?: string;
}> = ({size, rotation = 0, label = '1988', sublabel = '附录软盘', handwritten = '?'}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        borderRadius: size * 0.045,
        background: 'linear-gradient(145deg, #3a3e44 0%, #25282d 52%, #191b1f 100%)',
        boxShadow:
          '0 30px 60px rgba(0,0,0,0.55), inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.55)',
        position: 'relative',
        border: `${Math.max(2, size * 0.006)}px solid #111317`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '22%',
          top: '7%',
          width: '56%',
          height: '21%',
          borderRadius: size * 0.012,
          background:
            'linear-gradient(180deg, #d6dade 0%, #aeb3b8 38%, #8e9398 70%, #c3c7cb 100%)',
          boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.7), 0 2px 6px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '8%',
            top: '18%',
            width: '30%',
            height: '55%',
            background: '#3c4045',
            borderRadius: size * 0.008,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: '13%',
          top: '36%',
          width: '74%',
          height: '50%',
          background: '#e9e5d8',
          borderRadius: size * 0.008,
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.3)',
          padding: `${size * 0.045}px ${size * 0.05}px`,
          boxSizing: 'border-box',
          fontFamily: '"Noto Sans SC", sans-serif',
          color: '#2b2a26',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            fontSize: size * 0.1,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: size * 0.02,
            width: '100%',
            height: 2,
            background: 'rgba(40,38,32,0.35)',
          }}
        />
        <div
          style={{
            marginTop: size * 0.025,
            fontSize: size * 0.052,
            letterSpacing: 1,
            color: '#4a4740',
          }}
        >
          {sublabel}
        </div>
        <div
          style={{
            position: 'absolute',
            right: size * 0.05,
            bottom: size * 0.035,
            fontFamily: '"Noto Serif SC", serif',
            fontWeight: 900,
            fontSize: size * 0.12,
            color: '#2f4f8a',
            transform: 'rotate(-8deg)',
            opacity: 0.85,
          }}
        >
          {handwritten}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '4%',
          bottom: '6%',
          width: '7%',
          height: '16%',
          background: '#111317',
          borderRadius: size * 0.01,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '6%',
          bottom: '4%',
          width: '10%',
          height: '5%',
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
        }}
      />
    </div>
  );
};
