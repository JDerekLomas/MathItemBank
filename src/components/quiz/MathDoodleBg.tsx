'use client';

// WhatsApp-style repeating math symbol doodle background
// Renders as a single SVG tile that repeats via CSS background

interface MathDoodleBgProps {
  color?: string;       // stroke/fill color for icons
  opacity?: number;     // overall layer opacity
  className?: string;
}

export default function MathDoodleBg({
  color = 'currentColor',
  opacity = 0.07,
  className = '',
}: MathDoodleBgProps) {
  // Encode the tile SVG as a data URI for CSS background-image
  const tile = buildTileSVG(color);
  const encoded = `data:image/svg+xml,${encodeURIComponent(tile)}`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("${encoded}")`,
        backgroundRepeat: 'repeat',
        opacity,
      }}
    />
  );
}

function buildTileSVG(color: string): string {
  // 200x200 tile with ~16 math doodle icons scattered
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <g fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- plus -->
    <line x1="20" y1="12" x2="20" y2="24"/>
    <line x1="14" y1="18" x2="26" y2="18"/>
    <!-- equals -->
    <line x1="60" y1="22" x2="76" y2="22"/>
    <line x1="60" y1="28" x2="76" y2="28"/>
    <!-- triangle -->
    <polygon points="120,10 110,30 130,30"/>
    <!-- divide -->
    <line x1="168" y1="15" x2="168" y2="27"/>
    <circle cx="168" cy="10" r="2" fill="${color}"/>
    <circle cx="168" cy="32" r="2" fill="${color}"/>
    <!-- pi -->
    <line x1="14" y1="58" x2="34" y2="58"/>
    <line x1="19" y1="58" x2="19" y2="72"/>
    <line x1="29" y1="58" x2="31" y2="72"/>
    <!-- x squared -->
    <text x="65" y="72" font-size="14" font-family="serif" fill="${color}" stroke="none">x²</text>
    <!-- circle -->
    <circle cx="122" cy="65" r="10"/>
    <!-- multiply -->
    <line x1="163" y1="58" x2="175" y2="70"/>
    <line x1="175" y1="58" x2="163" y2="70"/>
    <!-- angle -->
    <polyline points="12,110 12,128 28,128"/>
    <path d="M 16,128 A 4,4 0 0,1 12,124" fill="none"/>
    <!-- fraction bar -->
    <text x="58" y="112" font-size="11" font-family="serif" fill="${color}" stroke="none">½</text>
    <!-- square -->
    <rect x="110" y="105" width="18" height="18" rx="1"/>
    <!-- infinity -->
    <path d="M 160,118 C 155,110 148,110 148,118 C 148,126 155,126 160,118 C 165,110 172,110 172,118 C 172,126 165,126 160,118"/>
    <!-- minus -->
    <line x1="14" y1="168" x2="30" y2="168"/>
    <!-- percent -->
    <circle cx="62" cy="158" r="3" fill="${color}"/>
    <line x1="58" y1="172" x2="72" y2="155"/>
    <circle cx="72" cy="170" r="3" fill="${color}"/>
    <!-- sqrt -->
    <polyline points="110,175 115,185 122,155 140,155"/>
    <!-- arrow -->
    <line x1="160" y1="170" x2="180" y2="170"/>
    <polyline points="175,165 180,170 175,175"/>
  </g>
</svg>`;
}
