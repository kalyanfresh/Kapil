import React from 'react';

interface KalyanFreshLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'emblem' | 'horizontal' | 'compact';
  showText?: boolean;
}

export const KalyanFreshLogo: React.FC<KalyanFreshLogoProps> = ({
  className = '',
  size = 48,
  variant = 'emblem',
  showText = false,
}) => {
  const numericSize = typeof size === 'number' ? size : 48;

  // The circular vector emblem matching the official Kalyan Fresh logo
  const EmblemSvg = (
    <svg
      viewBox="0 0 1000 1000"
      width={numericSize}
      height={numericSize}
      className={`inline-block select-none shrink-0 drop-shadow-xs transition-transform duration-200 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kalyan Fresh Logo"
    >
      <defs>
        {/* Metallic Gold Gradients */}
        <linearGradient id="kfGoldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDEAA3" />
          <stop offset="25%" stopColor="#E2B755" />
          <stop offset="50%" stopColor="#F9E596" />
          <stop offset="75%" stopColor="#C6952B" />
          <stop offset="100%" stopColor="#9E721D" />
        </linearGradient>

        <linearGradient id="kfGoldText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBF1BF" />
          <stop offset="35%" stopColor="#E5BE57" />
          <stop offset="70%" stopColor="#C59728" />
          <stop offset="100%" stopColor="#8C6314" />
        </linearGradient>

        <linearGradient id="kfGoldRing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C6952B" />
          <stop offset="25%" stopColor="#FCEBA0" />
          <stop offset="50%" stopColor="#D4A73E" />
          <stop offset="75%" stopColor="#FDF2BC" />
          <stop offset="100%" stopColor="#A57922" />
        </linearGradient>

        {/* Reusable Wreath Unit */}
        <g id="kfWreathUnit">
          <path d="M0,0 C3,8 3,16 0,24" stroke="url(#kfGoldRing)" strokeWidth="1.6" fill="none" />
          <path d="M0,6 C-9,4 -15,10 -18,17 C-13,19 -6,16 0,11 Z" fill="url(#kfGoldLinear)" stroke="#9E721D" strokeWidth="0.6" />
          <path d="M0,12 C9,10 15,16 18,23 C13,25 6,22 0,17 Z" fill="url(#kfGoldLinear)" stroke="#9E721D" strokeWidth="0.6" />
          <circle cx="-5" cy="18" r="1.8" fill="url(#kfGoldLinear)" />
          <circle cx="5" cy="10" r="1.8" fill="url(#kfGoldLinear)" />
        </g>
      </defs>

      {/* Crisp White Background Disk */}
      <circle cx="500" cy="500" r="486" fill="#FFFFFF" />

      {/* Outer Solid Gold Ring */}
      <circle cx="500" cy="500" r="476" fill="none" stroke="url(#kfGoldRing)" strokeWidth="8" />

      {/* Outer Ring of the Garland Band */}
      <circle cx="500" cy="500" r="446" fill="none" stroke="url(#kfGoldRing)" strokeWidth="2.5" />

      {/* Circular Laurel / Garland Ring */}
      <g transform="translate(500, 500)">
        {[
          0, 7.5, 15, 22.5, 30, 37.5, 45, 52.5, 60, 67.5, 75, 82.5,
          90, 97.5, 105, 112.5, 120, 127.5, 135, 142.5, 150, 157.5, 165, 172.5,
          180, 187.5, 195, 202.5, 210, 217.5, 225, 232.5, 240, 247.5, 255, 262.5,
          270, 277.5, 285, 292.5, 300, 307.5, 315, 322.5, 330, 337.5, 345, 352.5
        ].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            <use href="#kfWreathUnit" x="0" y="-432" />
          </g>
        ))}
      </g>

      {/* Inner Boundary of Garland */}
      <circle cx="500" cy="500" r="396" fill="none" stroke="url(#kfGoldRing)" strokeWidth="2.5" />

      {/* Inner Fine Accent Ring */}
      <circle cx="500" cy="500" r="384" fill="none" stroke="url(#kfGoldRing)" strokeWidth="1.2" />

      {/* TOP THREE GOLDEN FRUIT ICONS */}
      <g stroke="url(#kfGoldLinear)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 1. STRAWBERRY (Left) */}
        <g transform="translate(408, 280)">
          <path d="M-8,-16 C-12,-21 -18,-19 -20,-16 C-18,-12 -12,-12 -8,-14" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <path d="M0,-16 C0,-23 5,-25 8,-23 C8,-18 4,-16 0,-14" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <path d="M8,-16 C12,-21 18,-19 20,-16 C18,-12 12,-12 8,-14" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <path d="M-18,-12 C-26,4 -18,22 0,32 C18,22 26,4 18,-12 C10,-15 -10,-15 -18,-12 Z" strokeWidth="2.4" />
          <circle cx="-8" cy="-2" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="0" cy="-4" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="8" cy="-2" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="-12" cy="7" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="-4" cy="8" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="4" cy="8" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="12" cy="7" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="-7" cy="17" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="0" cy="18" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="7" cy="17" r="1.2" fill="url(#kfGoldLinear)" />
          <circle cx="0" cy="25" r="1.1" fill="url(#kfGoldLinear)" />
        </g>

        {/* 2. LEMON (Center) */}
        <g transform="translate(500, 276) rotate(-8)">
          <path d="M0,-18 C2,-26 8,-28 12,-26 C12,-20 8,-17 3,-17" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <path d="M0,-17 C16,-17 25,-4 24,10 C23,24 13,31 0,35 C-3,36 -5,35 -6,33 C-18,28 -24,16 -23,3 C-22,-10 -14,-17 0,-17 Z" strokeWidth="2.4" />
          <path d="M-12,4 C-8,14 -2,22 4,26" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
        </g>

        {/* 3. CITRUS / BERRY WITH LEAF SPRIG (Right) */}
        <g transform="translate(592, 280)">
          <path d="M-3,-16 C-7,-22 -14,-22 -16,-18 C-14,-14 -7,-14 -3,-14" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <path d="M3,-16 C8,-24 16,-23 18,-19 C15,-15 8,-14 3,-14" fill="url(#kfGoldLinear)" strokeWidth="0.8" />
          <circle cx="0" cy="6" r="21" strokeWidth="2.4" />
          <circle cx="0" cy="-6" r="2.5" fill="url(#kfGoldLinear)" />
        </g>
      </g>

      {/* KALYAN (All-caps classic serif typography) */}
      <text
        x="500"
        y="492"
        textAnchor="middle"
        style={{
          fontFamily: "'Cinzel', 'Playfair Display', 'Times New Roman', serif",
          fontWeight: 700,
          letterSpacing: '0.16em',
          fill: 'url(#kfGoldText)',
          stroke: '#8C6314',
          strokeWidth: 0.8,
        }}
        fontSize="118"
      >
        KALYAN
      </text>

      {/* Fresh (Calligraphic script typography) */}
      <text
        x="490"
        y="708"
        textAnchor="middle"
        style={{
          fontFamily: "'Great Vibes', 'Allura', 'Brush Script MT', cursive",
          fontWeight: 400,
          fill: 'url(#kfGoldText)',
          stroke: '#8C6314',
          strokeWidth: 0.6,
        }}
        fontSize="228"
      >
        Fresh
      </text>

      {/* REGISTERED TRADEMARK SYMBOL ® */}
      <g transform="translate(732, 572)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="url(#kfGoldRing)" strokeWidth="2.2" />
        <text
          x="0"
          y="5.5"
          textAnchor="middle"
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: '16px',
            fill: 'url(#kfGoldText)',
          }}
        >
          R
        </text>
      </g>
    </svg>
  );

  if (variant === 'emblem') {
    return EmblemSvg;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {EmblemSvg}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
              Kalyan Fresh
            </span>
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
              ®
            </span>
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Fresh Fruits & Vegetables • India
          </p>
        </div>
      )}
    </div>
  );
};
