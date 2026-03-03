'use client';

// Renders an AI-generated doodle PNG as a repeating or cover background

interface DoodleBgProps {
  src: string;
  opacity?: number;
  tile?: boolean;
  className?: string;
}

export default function DoodleBg({
  src,
  opacity = 0.2,
  tile = false,
  className = '',
}: DoodleBgProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: tile ? 'auto' : 'cover',
        backgroundRepeat: tile ? 'repeat' : 'no-repeat',
        backgroundPosition: 'center',
        opacity,
      }}
    />
  );
}
