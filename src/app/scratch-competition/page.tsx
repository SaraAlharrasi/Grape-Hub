"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// CURSOR (same as main page)
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

// COUNTDOWN
function Countdown() {
  const target = new Date("2026-03-20T09:00:00").getTime();

  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(target - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  const Box = ({ value, label }: any) => (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="bg-[#140024] border border-purple-600 rounded-xl p-6 w-28"
    >
      <div className="text-3xl font-bold text-green-400">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </motion.div>
  );

  return (
    <div className="flex gap-6 justify-center mt-10">
      <Box value={days} label="DAYS" />
      <Box value={hours} label="HOURS" />
      <Box value={minutes} label="MINUTES" />
      <Box value={seconds} label="SECONDS" />
    </div>
  );
}

// PAGE
export default function ScratchCompetitionPage() {
  return (
    <main className="min-h-screen bg-[#0b0018] text-white px-6 py-16">
      <Cursor />

      {/* BACK BUTTON */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-purple-300 hover:text-green-400 mb-10"
      >
        ← Home
      </Link>

      {/* HERO */}
      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-extrabold
          bg-gradient-to-r from-purple-400 to-green-400
          text-transparent bg-clip-text"
        >
          Scratch Story Competition
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mt-6 text-xl max-w-2xl mx-auto"
        >
          Create your own interactive story using PictoBlox. Let your creativity
          shine with animation, characters, and storytelling.
        </motion.p>

        <Countdown />
      </section>

      {/* DETAILS */}
      <section className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card
          title="Who Can Join"
          text="Open to students from Grade 3 to Grade 8."
        />

        <Card
          title="What to Create"
          text="An interactive story using PictoBlox. Include characters, animation, and user interaction."
        />

        <Card
          title="Duration"
          text="45 minutes to design and present your story."
        />

        <Card
          title="Skills You Learn"
          text="Logic, creativity, animation, storytelling, and coding."
        />

        <Card
          title="Platform"
          text="PictoBlox Scratch-style programming environment."
        />

        <Card
          title="Judging"
          text="Creativity, storytelling, interaction, and originality."
        />
      </section>

      {/* CTA */}
      <section className="text-center mt-24">
        <motion.a
          whileHover={{ scale: 1.1 }}
          href="https://docs.google.com/forms/d/e/1FAIpQLSeYY0GKbcx5XK-HB4PcTAoiJiDkVG46gXbedryqMC8LGj2Qsg/viewform?usp=publish-editor"
          target="_blank"
          className="
          inline-block
          px-12 py-5
          rounded-full
          bg-purple-600
          hover:bg-green-500
          transition-all
          font-semibold
          shadow-[0_0_30px_rgba(168,85,247,.7)]
          "
        >
          Register Now
        </motion.a>
      </section>
    </main>
  );
}

// CARD COMPONENT
function Card({ title, text }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
      className="
      bg-[#140024]
      border border-purple-600
      rounded-xl
      p-6
      shadow-[0_0_30px_rgba(168,85,247,.4)]
      "
    >
      <h3 className="text-xl font-bold text-purple-300 mb-3">{title}</h3>

      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
}
