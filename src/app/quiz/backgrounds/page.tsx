'use client';

import { useState } from 'react';

const MATH_LIGHT_BGS = [
  { src: '/textures/math-doodle-light-1.png', label: 'Math Light 1' },
  { src: '/textures/math-doodle-light-2.png', label: 'Math Light 2' },
  { src: '/textures/math-doodle-light-3.png', label: 'Math Light 3' },
  { src: '/textures/math-doodle-light-4.png', label: 'Math Light 4' },
];

const MATH_DARK_BGS = [
  { src: '/textures/math-doodle-dark-1.png', label: 'Math Dark 1' },
  { src: '/textures/math-doodle-dark-2.png', label: 'Math Dark 2' },
  { src: '/textures/math-doodle-dark-3.png', label: 'Math Dark 3' },
  { src: '/textures/math-doodle-dark-4.png', label: 'Math Dark 4' },
];

const VIBE_LIGHT_BGS = [
  { src: '/textures/vibecode-light-1.png', label: 'Code Light 1' },
  { src: '/textures/vibecode-light-2.png', label: 'AI/Tech Light 2' },
  { src: '/textures/vibecode-light-3.png', label: 'Creative Light 3' },
  { src: '/textures/vibecode-light-4.png', label: 'Edu/Tech Light 4' },
];

const VIBE_DARK_BGS = [
  { src: '/textures/vibecode-dark-1.png', label: 'Code Dark 1' },
  { src: '/textures/vibecode-dark-2.png', label: 'AI/Tech Dark 2' },
  { src: '/textures/vibecode-dark-3.png', label: 'Creative Dark 3' },
  { src: '/textures/vibecode-dark-4.png', label: 'Edu/Tech Dark 4' },
];

const EXISTING = [
  { src: '/textures/doodles.png', label: 'Doodles (household)', tile: true },
  { src: '/textures/school.png', label: 'School icons', tile: true },
  { src: '/textures/tt-type.png', label: 'Typography', tile: true },
  { src: '/textures/cartographer.png', label: 'Cartographer', tile: true },
  { src: '/textures/tt-gplay.png', label: 'Triangles', tile: true },
  { src: '/textures/tt-dark-geometric.png', label: 'Dark geometric', tile: true },
  { src: '/textures/tt-escheresque-dark.png', label: 'Escher cubes', tile: true },
  { src: '/textures/crossword.png', label: 'Crosshatch', tile: true },
];

export default function BackgroundPicker() {
  const [preview, setPreview] = useState<{ src: string; label: string; tile?: boolean } | null>(null);

  return (
    <div className="min-h-screen bg-stone-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Background Picker</h1>
        <p className="text-stone-500 mb-8">Click any thumbnail to preview full-size. AI-generated ones are single images; existing ones tile.</p>

        {/* Full-size preview */}
        {preview && (
          <div className="mb-8 rounded-2xl overflow-hidden border-2 border-stone-300 shadow-lg">
            <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-stone-200">
              <span className="font-semibold text-stone-700">{preview.label}</span>
              <div className="flex gap-2">
                <span className="text-xs text-stone-400">{preview.tile ? 'Tileable' : 'Single image'}</span>
                <button onClick={() => setPreview(null)} className="text-stone-400 hover:text-stone-600">
                  Close
                </button>
              </div>
            </div>
            {preview.tile ? (
              <div
                className="w-full h-[500px]"
                style={{ backgroundImage: `url(${preview.src})`, backgroundRepeat: 'repeat' }}
              />
            ) : (
              <img src={preview.src} alt={preview.label} className="w-full" />
            )}
          </div>
        )}

        {/* Simulated quiz preview */}
        {preview && (
          <div className="mb-8 rounded-2xl overflow-hidden border-2 border-stone-300 shadow-lg">
            <div className="px-4 py-2 bg-white border-b border-stone-200">
              <span className="font-semibold text-stone-700">Quiz Preview with &quot;{preview.label}&quot;</span>
            </div>
            <div
              className="relative p-8"
              style={
                preview.tile
                  ? { backgroundImage: `url(${preview.src})`, backgroundRepeat: 'repeat' }
                  : { backgroundImage: `url(${preview.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              }
            >
              <div className="max-w-md mx-auto space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 text-stone-500">
                  Question 3 of 7
                </span>
                <h2 className="text-xl font-semibold text-stone-900 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                  What is the value of x if 3x + 7 = 22?
                </h2>
                {['x = 5', 'x = 7', 'x = 3', 'x = 15'].map((opt, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm border-2 border-white/60 rounded-xl p-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-stone-100 text-stone-500 flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-stone-700">{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <h2 className="text-lg font-bold text-stone-800 mb-4">Math Doodles — Light</h2>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {MATH_LIGHT_BGS.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setPreview(bg)}
              className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                preview?.src === bg.src ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-stone-200'
              }`}
            >
              <img src={bg.src} alt={bg.label} className="w-full aspect-square object-cover" />
              <div className="px-3 py-2 bg-white text-sm font-medium text-stone-700">{bg.label}</div>
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-stone-800 mb-4">Math Doodles — Dark</h2>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {MATH_DARK_BGS.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setPreview(bg)}
              className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                preview?.src === bg.src ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-stone-200'
              }`}
            >
              <img src={bg.src} alt={bg.label} className="w-full aspect-square object-cover" />
              <div className="px-3 py-2 bg-white text-sm font-medium text-stone-700">{bg.label}</div>
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-stone-800 mb-4">Vibecoding — Light</h2>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {VIBE_LIGHT_BGS.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setPreview(bg)}
              className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                preview?.src === bg.src ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-stone-200'
              }`}
            >
              <img src={bg.src} alt={bg.label} className="w-full aspect-square object-cover" />
              <div className="px-3 py-2 bg-white text-sm font-medium text-stone-700">{bg.label}</div>
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-stone-800 mb-4">Vibecoding — Dark</h2>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {VIBE_DARK_BGS.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setPreview(bg)}
              className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                preview?.src === bg.src ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-stone-200'
              }`}
            >
              <img src={bg.src} alt={bg.label} className="w-full aspect-square object-cover" />
              <div className="px-3 py-2 bg-white text-sm font-medium text-stone-700">{bg.label}</div>
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold text-stone-800 mb-4">Existing Tileable Textures</h2>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {EXISTING.map((bg) => (
            <button
              key={bg.label}
              onClick={() => setPreview(bg)}
              className={`rounded-xl overflow-hidden border-2 transition-all hover:scale-105 hover:shadow-lg ${
                preview?.src === bg.src ? 'border-indigo-500 ring-2 ring-indigo-300' : 'border-stone-200'
              }`}
            >
              <div
                className="w-full aspect-square"
                style={{ backgroundImage: `url(${bg.src})`, backgroundRepeat: 'repeat', backgroundSize: bg.tile ? 'auto' : 'cover' }}
              />
              <div className="px-3 py-2 bg-white text-sm font-medium text-stone-700">{bg.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
