'use client';

// Playful polka dot background with varying sizes

interface PolkaDotBgProps {
  color?: string;
  opacity?: number;
  className?: string;
}

export default function PolkaDotBg({
  color = 'currentColor',
  opacity = 0.08,
  className = '',
}: PolkaDotBgProps) {
  const tile = buildDotTile(color);
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

function buildDotTile(color: string): string {
  // 120x120 tile with dots of varying sizes for a playful feel
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <g fill="${color}">
    <circle cx="10" cy="10" r="4"/>
    <circle cx="50" cy="8" r="2.5"/>
    <circle cx="90" cy="12" r="3.5"/>
    <circle cx="30" cy="35" r="3"/>
    <circle cx="70" cy="32" r="5"/>
    <circle cx="110" cy="38" r="2"/>
    <circle cx="15" cy="60" r="3.5"/>
    <circle cx="55" cy="58" r="2"/>
    <circle cx="95" cy="62" r="4"/>
    <circle cx="35" cy="85" r="2.5"/>
    <circle cx="75" cy="88" r="3"/>
    <circle cx="8" cy="95" r="2"/>
    <circle cx="115" cy="90" r="3.5"/>
    <circle cx="60" cy="110" r="2.5"/>
    <circle cx="100" cy="115" r="2"/>
  </g>
</svg>`;
}
