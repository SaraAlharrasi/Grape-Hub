"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Link from "next/link";

const GRAPE_PURPLE = "#7C3AED";
const GRAPE_GREEN = "#22E58B";

function Cursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";

      ring.style.left = mouseX + "px";
      ring.style.top = mouseY + "px";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cursor.remove();
      ring.remove();
    };
  }, []);

  return null;
}

/* ================= FLIP COUNTDOWN ================= */

function Countdown() {
  const target = new Date("2026-04-06T09:00:00+04:00").getTime();

  const bootLines = [
    "BOOTING GRAPE SYSTEM...",
    "LOADING HACKATHON MODULE...",
    "CONNECTING TO SERVER...",
    "AUTHENTICATION SUCCESSFUL",
    "INITIALIZING COUNTDOWN TIMER...",
  ];

  const [bootIndex, setBootIndex] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [timeDisplay, setTimeDisplay] = useState("");
  const [isLive, setIsLive] = useState(false);

  // Boot animation
  useEffect(() => {
    if (bootIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setBootIndex(bootIndex + 1);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setBootComplete(true), 500);
    }
  }, [bootIndex]);

  // Countdown logic
  useEffect(() => {
    if (!bootComplete) return;

    const timer = setInterval(() => {
      const remaining = target - Date.now();

      if (remaining <= 0) {
        setIsLive(true);
        setTimeDisplay("00d : 00h : 00m : 00s");
        return;
      }

      const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const s = Math.floor((remaining / 1000) % 60);

      setTimeDisplay(
        `${d.toString().padStart(2, "0")}d : ${h.toString().padStart(2, "0")}h : ${m.toString().padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [bootComplete]);

  return (
    <div
      className="
      mt-12
      bg-black/40
      border border-green-500/30
      rounded-xl
      px-8 py-6
      shadow-[0_0_40px_rgba(34,197,94,0.3)]
      font-mono
      text-left
      max-w-lg
    "
    >
      {/* Boot sequence */}
      {bootLines.slice(0, bootIndex).map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-400"
        >
          &gt; {line}
        </motion.p>
      ))}

      {!bootComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-green-500"
        >
          █
        </motion.span>
      )}

      {/* LIVE STATE */}
      {bootComplete && isLive && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              text-green-400 mt-4 text-2xl font-bold
              shadow-[0_0_20px_rgba(34,197,94,0.8)]
            "
          >
            &gt; HACKATHON STATUS: LIVE
          </motion.p>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-green-500 mt-2"
          >
            &gt; ACCEPTING PARTICIPANTS █
          </motion.p>
        </>
      )}

      {/* COUNTDOWN STATE */}
      {bootComplete && !isLive && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 mt-4 text-xl"
          >
            &gt; TIME REMAINING: {timeDisplay}
          </motion.p>

          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-green-500 mt-2"
          >
            &gt; STATUS: READY █
          </motion.p>
        </>
      )}
    </div>
  );
}

export default function PythonHackathonPage() {
  return (
    <main className="min-h-screen bg-[#0b0018] text-white relative overflow-hidden">
      <Cursor />

      {/* BACK BUTTON */}
      <div className="absolute top-8 left-8 z-50">
        <a
          href="/"
          className="flex items-center gap-2 text-purple-300 hover:text-green-400 transition"
        >
          ← Home
        </a>
      </div>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1
          className="
      text-7xl md:text-8xl font-extrabold mb-6
      bg-gradient-to-r from-purple-400 via-fuchsia-500 to-green-400
      text-transparent bg-clip-text
      drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]
    "
        >
          PYTHON HACKATHON II
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
          The next evolution. More challenging. More competitive. More
          rewarding.
        </p>

        <div className="mt-10 text-green-400 text-lg font-semibold">
          Intermediate Level • 1 Hour • Limited Seats
        </div>
        <Countdown />
      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 flex justify-center">
        <div className="max-w-4xl text-center">
          <h2 className="text-5xl font-bold mb-10 text-purple-300">
            This is not your first hackathon anymore.
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            After the success of our first beginner hackathon, where students
            built their first Python projects, GRAPE now presents the next
            challenge.
            <br />
            <br />
            This hackathon is designed for students ready to go beyond basics.
            Participants will face an intermediate-level programming challenge
            requiring logic, problem-solving, and efficient coding under
            pressure.
            <br />
            <br />
            You have only{" "}
            <span className="text-green-400 font-bold">60 minutes</span>
            to design, code, and deliver your solution.
          </p>
        </div>
      </section>

      {/* PRIZES */}
      <section className="py-32 flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-20 text-purple-300">Prize Pool</h2>

        <div className="grid md:grid-cols-3 gap-12">
          {/* First */}
          <div
            className="
        bg-gradient-to-b from-yellow-400/20 to-transparent
        border border-yellow-400
        rounded-2xl p-10 text-center
        shadow-[0_0_40px_rgba(250,204,21,0.4)]
      "
          >
            <div className="text-5xl mb-4">🥇</div>
            <h3 className="text-3xl font-bold text-yellow-400">1st Place</h3>
            <p className="text-4xl font-extrabold mt-4">50 OMR</p>
          </div>

          {/* Second */}
          <div
            className="
        bg-gradient-to-b from-gray-400/20 to-transparent
        border border-gray-300
        rounded-2xl p-10 text-center
        shadow-[0_0_40px_rgba(200,200,200,0.3)]
      "
          >
            <div className="text-5xl mb-4">🥈</div>
            <h3 className="text-3xl font-bold text-gray-300">2nd Place</h3>
            <p className="text-4xl font-extrabold mt-4">25 OMR</p>
          </div>

          {/* Third */}
          <div
            className="
        bg-gradient-to-b from-orange-400/20 to-transparent
        border border-orange-400
        rounded-2xl p-10 text-center
        shadow-[0_0_40px_rgba(251,146,60,0.4)]
      "
          >
            <div className="text-5xl mb-4">🥉</div>
            <h3 className="text-3xl font-bold text-orange-400">3rd Place</h3>
            <p className="text-4xl font-extrabold mt-4">10 OMR</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 flex justify-center">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-12 text-center text-purple-300">
            Event Structure
          </h2>

          <div className="space-y-6 text-lg text-gray-300">
            <div className="flex justify-between border-b border-purple-700 pb-2">
              <span>Challenge Reveal</span>
              <span className="text-green-400">0:00</span>
            </div>

            <div className="flex justify-between border-b border-purple-700 pb-2">
              <span>Coding Phase</span>
              <span className="text-green-400">60 Minutes</span>
            </div>

            <div className="flex justify-between border-b border-purple-700 pb-2">
              <span>Submission Deadline</span>
              <span className="text-green-400">Final Minute</span>
            </div>

            <div className="flex justify-between">
              <span>Winner Announcement</span>
              <span className="text-green-400">After Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="py-32 flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-16 text-purple-300">Sponsors</h2>

        <p className="text-gray-400 mb-12">Sponsors will be announced soon.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
            w-40 h-20
            border border-purple-700
            rounded-lg
            flex items-center justify-center
            text-purple-500
            opacity-40
          "
            >
              Your Logo
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Are you ready to prove your skills?
        </h2>

        <p className="text-gray-400 mb-10 text-center">
          Only the best problem solvers will win.
        </p>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSd4EF8NP9kpb02eU7bqEm7MigQsF8R6dput8-3tkxMRvNELig/viewform?usp=dialog"
          className="
        px-10 py-5
        bg-gradient-to-r from-purple-500 to-green-400
        rounded-full font-bold text-lg
        hover:scale-110 transition
        shadow-[0_0_40px_rgba(168,85,247,0.6)]
      "
        >
          Join GRAPE to Participate
        </a>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-32 px-10 text-center max-w-6xl mx-auto">
      <h2
        className="text-6xl font-extrabold mb-16
                     bg-gradient-to-r from-purple-400 to-green-400
                     text-transparent bg-clip-text"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
