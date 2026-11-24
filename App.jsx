
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Music, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import "./App.css";

const base = import.meta.env.BASE_URL;

const songs = [
  `${base}music/steal-the-show.mp3`,
  `${base}music/tiramisu-cake.mp3`,
  `${base}music/left-and-right.mp3`,
];

const memories = [
  { image: "photo1.jpg", caption: "My one and only favourite roomie ♡" },
  { image: "photo2.jpg", caption: "The little moments" },
  { image: "photo3.jpg", caption: "Never a dull moment" },
  { image: "photo4.jpg", caption: "Us being us" },
  { image: "photo5.jpg", caption: "More memories, please" },
  { image: "photo6.jpg", caption: "Always a good time" },
];

const notes = [
  "Thank you for being my best friend.",
  "I love how we can talk about absolutely anything and everything.",
  "I'm so glad college gave me a roommate and a sister like you.",
];

function Section({ children, className = "" }) {
  return (
    <motion.section
      className={`section ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.section>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [revealed, setRevealed] = useState([]);
  const [candles, setCandles] = useState([true, true, true]);

  const audioRef = useRef(null);
  const songIndex = useRef(0);

  const celebrate = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: [
        "#eaa6b9",
        "#b83b50",
        "#f7dce3",
        "#f5d58a",
      ],
    });
  };

  const playMusic = async () => {
    try {
      audioRef.current.volume = 0.35;
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const openSurprise = () => {
    setOpened(true);
    celebrate();
    playMusic();
  };

  const toggleMusic = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      playMusic();
    }
  };

  const nextSong = () => {
    songIndex.current =
      (songIndex.current + 1) % songs.length;

    audioRef.current.src = songs[songIndex.current];
    playMusic();
  };

  const revealNote = (index) => {
    setRevealed((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const blowCandle = (index) => {
    if (!candles[index]) return;

    const updated = candles.map((lit, i) =>
      i === index ? false : lit
    );

    setCandles(updated);

    if (updated.every((lit) => !lit)) {
      celebrate();
    }
  };

  const wishMade = candles.every((lit) => !lit);

  return (
    <div className="birthday-site">

      {/* Background music */}

      <audio
        ref={audioRef}
        src={songs[0]}
        onEnded={nextSong}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onError={() => setPlaying(false)}
        preload="none"
      />

      {/* Floating background hearts */}

      <div className="floating-hearts" aria-hidden="true">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 19 + 7) % 100}%`,
              animationDelay: `${-(i * 1.7)}s`,
              animationDuration: `${12 + (i % 5) * 3}s`,
              fontSize: `${15 + (i % 5) * 6}px`,
              color: [
                "#b83b50",
                "#d97891",
                "#e8a5b7",
              ][i % 3],
            }}
          >
            {i % 3 === 0 ? "♥" : "♡"}
          </span>
        ))}
      </div>

      {/* Music toggle */}

      {opened && (
        <button
          className="music-toggle"
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            <Music size={20} />
          ) : (
            <VolumeX size={20} />
          )}
        </button>
      )}

      {/* Welcome screen */}

      {!opened ? (
        <motion.div
          className="welcome-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="welcome-card">
            <div className="bow">🎀</div>

            <p className="eyebrow">
              25 NOVEMBER 2026
            </p>

            <h1>
              Happy Birthday,
              <br />
              <span>Meghana!</span>
            </h1>

            <p className="welcome-subtitle">
              21 looks good on you.
            </p>

            <p className="welcome-description">
              A little birthday surprise,
              <br />
              made especially for you.
            </p>

            <motion.button
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openSurprise}
            >
              Open your surprise ♡
            </motion.button>

            <p className="tiny-text">
              MADE WITH LOVE BY YOUR ROOMIE
            </p>
          </div>
        </motion.div>
      ) : (
        <main>

          {/* Birthday hero */}

          <Section className="hero">
            <div className="bow">🎀</div>

            <p className="eyebrow">
              THE BIRTHDAY EDITION
            </p>

            <div className="big-age">21</div>

            <h1>Looks good on you.</h1>

            <p className="handwritten">
              Happy birthday, Meghana!
            </p>

            <p className="hero-description">
              Here's to another year of laughter,
              little adventures, and making memories
              worth keeping.
            </p>

            <div className="scroll-hint">
              scroll for a little birthday love
              <span>↓</span>
            </div>
          </Section>

          <div className="section-divider">♡</div>

          {/* Photo gallery */}

          <Section>
            <p className="eyebrow">
              THE ROOMMATE DIARIES
            </p>

            <h2>Little moments with you</h2>

            <p className="section-description">
              Because the random little moments
              are sometimes the best ones.
            </p>

            <div className="photo-grid">
              {memories.map((memory, index) => (
                <motion.div
                  className="polaroid"
                  key={index}
                  style={{
                    rotate: index % 2 === 0 ? -3 : 3,
                  }}
                  whileHover={{
                    scale: 1.06,
                    rotate: 0,
                  }}
                >
                  <div className="photo-frame">
                    <div className="photo-placeholder">
                      <Heart size={30} strokeWidth={1} />
                      <span>Memory {index + 1}</span>
                    </div>

                    <img
                      src={`${base}photos/${memory.image}`}
                      alt={memory.caption}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  </div>

                  <p>{memory.caption}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <div className="section-divider">♡</div>

          {/* Clickable hearts */}

          <Section>
            <p className="eyebrow">
              JUST A LITTLE REMINDER
            </p>

            <h2>A few things I love about you</h2>

            <p className="section-description">
              Tap each heart for a little message.
            </p>

            <div className="notes-grid">
              {notes.map((note, index) => (
                <motion.button
                  key={index}
                  className={`love-note ${
                    revealed.includes(index)
                      ? "revealed"
                      : ""
                  }`}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => revealNote(index)}
                  aria-expanded={revealed.includes(index)}
                >
                  {revealed.includes(index) ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span className="small-heart">
                        ♡
                      </span>
                      <p>{note}</p>
                    </motion.div>
                  ) : (
                    <>
                      <Heart
                        size={48}
                        fill="#d97891"
                        strokeWidth={1}
                      />
                      <span>Open me</span>
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </Section>

          <div className="section-divider">♡</div>

          {/* Interactive birthday cake */}

          <Section className="cake-section">
            <p className="eyebrow">
              A LITTLE BIRTHDAY MAGIC
            </p>

            <h2>Make a wish!</h2>

            <p className="section-description">
              {wishMade
                ? "May all your wishes come true. ♡"
                : "Close your eyes, make a wish and tap the candles."}
            </p>

            <div className="cake-scene">
              <div className="candles">
                {candles.map((lit, index) => (
                  <button
                    key={index}
                    className="candle-button"
                    onClick={() => blowCandle(index)}
                    aria-label={`Blow out candle ${index + 1}`}
                    disabled={!lit}
                  >
                    {lit ? (
                      <span className="flame" />
                    ) : (
                      <span className="smoke">〰</span>
                    )}

                    <span className="candle-stick" />
                  </button>
                ))}
              </div>

              <div className="cake-top" />

              <div className="cake-body">
                <div className="icing">
                  {Array.from(
                    { length: 7 },
                    (_, i) => <span key={i} />
                  )}
                </div>

                <span className="cake-message">
                  Happy 21st
                </span>

                <div className="cake-hearts">
                  ♡ ♡ ♡
                </div>
              </div>

              <div className="cake-plate" />
            </div>

            {wishMade && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="wish-message">
                  Happy birthday, birthday girl! 🎀
                </p>

                <button
                  className="text-button"
                  onClick={() =>
                    setCandles([true, true, true])
                  }
                >
                  Make another wish ♡
                </button>
              </motion.div>
            )}
          </Section>

          <div className="section-divider">♡</div>

          {/* Birthday letter */}

          <Section>
            <p className="eyebrow">
              A LITTLE LETTER FOR YOU
            </p>

            <h2>With love, your roomie</h2>

            <div className="letter">
              <div className="letter-decoration">
                ♡
              </div>

              <h3>Dear Meghana,</h3>

              <p>
                Happy 21st birthday Myghana! I hope everything works out for you at the end and i can't wait to experience life with you and make more memories together.
              </p>

              <p>
                Thank you for all the random
                conversations, the laughter and the
                little moments that made our college
                days so special.
              </p>

              <p>
                Here's to more adventures, more
                memories and everything exciting
                that life has waiting for you.
                I hope 21 is your best chapter yet.
              </p>

              <p className="letter-signature">
                Lots of love,
                <br />
                Your only roomie ♡
              </p>
            </div>
          </Section>

          {/* Closing message */}

          <footer>
            <div className="footer-bow">🎀</div>

            <p className="closing-line">
              Of all the people I could've ended up
              sharing a room with, I'm so glad it
              was you. ♡
            </p>

            <p className="eyebrow">
              HAPPY 21ST, MEGHANA.
            </p>

            <p className="footer-credit">
              Made with love, just for you.
              <br />
              25.11.2026
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
