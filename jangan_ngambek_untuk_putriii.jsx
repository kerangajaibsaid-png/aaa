import React, { useState, useRef } from "react";

// JanganNgambekForPutri - versi kata-kata rayuan / bujukan

export default function JanganNgambekForPutri() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showSurprise, setShowSurprise] = useState(false);
  const messages = [
    "Putri cantik, maafin aku ya kalau ada kata-kata yang bikin kamu kesal. Aku cuma mau lihat senyum manismu lagi.",
    "Kamu itu cahaya buat hari-hariku. Tanpa senyum kamu, dunia rasanya redup.",
    "Boleh dong aku jadi alasan kamu bahagia lagi? Aku janji bakal lebih sabar dan dengerin kamu sepenuh hati.",
    "Aku rindu tawa kamu, Putri. Yuk kita ngobrol pelan-pelan, aku dengerin semua ceritamu." 
  ];

  const hearts = ["💕", "💖", "🌸", "🥰"];
  const audioRef = useRef(null);

  function handleCheer() {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  }

  function nextMessage() {
    setMessageIndex((i) => (i + 1) % messages.length);
  }

  function handleSurprise() {
    setShowSurprise(true);
    handleCheer();
    if (audioRef.current) {
      try { audioRef.current.play(); } catch (e) {}
    }
    setTimeout(() => setShowSurprise(false), 4000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 p-6">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-pink-200">
        <header className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-200 flex items-center justify-center text-2xl font-semibold text-white shadow-md">P</div>
          <div>
            <h1 className="text-2xl font-extrabold text-rose-700">Jangan Ngambek, Putri 💌</h1>
            <p className="text-sm text-rose-500">Sedikit bujukan manis dari aku untuk Putri tersayang.</p>
          </div>
        </header>

        <main className="mt-6">
          <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
            <p className="text-justify text-rose-700 leading-relaxed">{messages[messageIndex]}</p>
            <div className="mt-3 flex gap-2 items-center">
              <button onClick={nextMessage} className="px-3 py-2 rounded-md bg-rose-600 text-white font-medium shadow hover:scale-[1.02] transition">Lanjut</button>
              <button onClick={handleSurprise} className="px-3 py-2 rounded-md bg-yellow-400 text-rose-800 font-medium shadow hover:scale-[1.02] transition">Kejutan</button>
              <button onClick={() => {navigator.clipboard?.writeText(messages[messageIndex]);}} className="px-3 py-2 rounded-md border border-rose-200 text-rose-700">Salin</button>
            </div>
          </div>

          <section className="mt-6 flex gap-3 items-center">
            <div className="flex-1 text-center">
              <p className="text-sm text-rose-500">Kirim bunga virtual</p>
              <button onClick={() => {handleCheer();}} className="mt-2 px-4 py-2 rounded-full bg-white border border-pink-200 shadow">Kirim 🌷</button>
            </div>

            <div className="w-28 h-28 rounded-xl bg-white/60 flex items-center justify-center border border-pink-100">
              <div className="text-center">
                <div className="text-3xl">{hearts[messageIndex % hearts.length]}</div>
                <div className="text-xs text-rose-500">Untuk Putri</div>
              </div>
            </div>
          </section>

          <footer className="mt-6 text-center text-sm text-rose-400">
            <p>Pesan manis hanya untuk: <strong className="text-rose-600">Putri</strong></p>
          </footer>
        </main>

      </div>

      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 flex items-start justify-center overflow-hidden z-50">
          <div className="absolute inset-0" style={{mixBlendMode: 'screen'}} />
          <div className="mt-28 w-full flex items-start justify-center">
            <Confetti />
          </div>
        </div>
      )}

      {showSurprise && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative z-10 bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold text-rose-600">Surprise, Putri! 🎉</h2>
            <p className="mt-3 text-rose-500">Aku kirim banyak pelukan dan janji buat jaga hati kamu lebih baik lagi.</p>
            <div className="mt-4">
              <button onClick={() => setShowSurprise(false)} className="px-4 py-2 rounded-md bg-rose-600 text-white">Terima ya</button>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={"data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAA..."} />
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 22 }).map((_, i) => ({ id: i }));

  return (
    <div className="relative w-full max-w-2xl h-40 pointer-events-none">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={`absolute animate-fall`} 
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${-10 - Math.random() * 30}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            fontSize: `${8 + Math.random() * 18}px`,
            opacity: 0.95,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        >
          {randomConfettiChar()}
        </span>
      ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1 }
          100% { transform: translateY(30vh) rotate(360deg); opacity: 0 }
        }
        .animate-fall { animation: fall 2.2s linear forwards; }
      `}</style>
    </div>
  );
}

function randomConfettiChar() {
  const pool = ["🌸","💖","💕","🌹","✨","🎀","💫"];
  return pool[Math.floor(Math.random() * pool.length)];
}