"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-context";
import { useMotionValue, useTransform } from "framer-motion";

const events = [
  {
    date: "2026-04-06",
    title: "Python Hackathon",
    link: "/python-hackathon",
  },
  {
    date: "2026-03-20",
    title: "Scratch Story Competition",
    link: "/scratch-competition",
  },
  {
    date: "2026-03-05",
    title: "Arduino Workshop",
  },
];

function ParticleField() {
  useEffect(() => {
    const container = document.getElementById("hero-particles");
    if (!container) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.zIndex = "0";
    container.appendChild(canvas);

    let w = (canvas.width = container.offsetWidth);
    let h = (canvas.height = container.offsetHeight);

    const mouse = { x: w / 2, y: h / 2, vx: 0, vy: 0 };
    let mouseInside = false;

    const resize = () => {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", resize);

    container.addEventListener("mouseenter", () => (mouseInside = true));
    container.addEventListener("mouseleave", () => (mouseInside = false));

    window.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.vx = x - mouse.x;
      mouse.vy = y - mouse.y;
      mouse.x = x;
      mouse.y = y;
    });

    const particles = Array.from({ length: 80 }).map(() => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const depth = Math.random();

      return {
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        depth,
        size: 4 + depth * 4,
        color: Math.random() > 0.5 ? "#742886" : "#22c55e",
      };
    });

    function drawParticle(p: any) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 20 * p.depth;
      ctx.shadowColor = p.color;
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calm floating (default)
        if (!mouseInside) {
          p.vx += (p.homeX - p.x) * 0.004;
          p.vy += (p.homeY - p.y) * 0.004;
        }

        // Fast repulsion (inside hero)
        if (mouseInside && dist < 180) {
          p.vx += dx * 0.006;
          p.vy += dy * 0.006;
        }

        // Fast shake
        const shake = Math.abs(mouse.vx) + Math.abs(mouse.vy);
        if (mouseInside && shake > 25) {
          p.vx += (Math.random() - 0.5) * 5 * p.depth;
          p.vy += (Math.random() - 0.5) * 5 * p.depth;
        }

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        drawParticle(p);
      });

      setTimeout(() => requestAnimationFrame(animate), 16);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeChild(canvas);
    };
  }, []);

  return null;
}
function Cursor() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    document.documentElement.appendChild(cursor);
    document.documentElement.appendChild(ring);
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

function HeroInteractive() {
  return (
    <section
      id="hero-particles"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <div className="relative z-10 text-center flex flex-col items-center">
        <img
          src="/logo.png"
          alt="GRAPE"
          className="mx-auto mb-10"
          style={{ width: 550, height: 380 }}
        />

        <h1
          className="text-8xl font-extrabold
          bg-gradient-to-r from-purple-400 to-green-400
          text-transparent bg-clip-text"
        >
          GRAPE
        </h1>

        <p className="mt-6 text-xl text-gray-300">
          Game Development • Robotics • AI • Programming • Engineering
        </p>
      </div>
      <div className="absolute bottom-24 right-24"></div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "Who can join GRAPE?",
      a: "Any student passionate about technology and innovation.",
    },
    {
      q: "Do I need experience?",
      a: "No. Beginners are welcome in all tracks.",
    },
    {
      q: "Is it free?",
      a: "Yes. All activities and workshops are free for students.",
    },
  ];

  return (
    <div className="relative z-10 w-full max-w-4xl space-y-6">
      {faqs.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[#140024] border border-green-500 rounded-2xl p-6
                     shadow-[0_10px_35px_rgba(34,197,94,.35)] cursor-pointer"
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg text-green-300 font-semibold">{item.q}</h3>
            <span className="text-green-400 text-xl">
              {open === i ? "−" : "+"}
            </span>
          </div>

          {open === i && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-gray-300 mt-4 text-sm"
            >
              {item.a}
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function EventCalendar() {
  const router = useRouter();
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir: number) => {
    setCurrent(new Date(year, month + dir, 1));
  };

  const monthName = current.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-5xl mx-auto text-center">
      <h2
        className="text-7xl font-extrabold mb-10
        bg-gradient-to-r from-purple-400 to-green-400
        text-transparent bg-clip-text"
      >
        Event Calendar
      </h2>

      <div className="flex justify-between items-center mb-10">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <p className="text-2xl text-purple-300">{monthName}</p>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const event = events.find((e) => e.date === dateStr);

          return (
            <div
              key={day}
              onClick={() => {
                if (event?.link) {
                  router.push(event.link);
                }
              }}
              className={`h-24 rounded-lg flex flex-col items-center justify-center
    transition-all duration-300 cursor-pointer
    ${
      event
        ? "bg-purple-600 text-white shadow-[0_0_30px_#a855f7]"
        : "bg-[#0d001a] border border-purple-700 text-purple-300"
    }
    ${event?.link ? "hover:scale-110" : ""}
  `}
            >
              <span className="text-lg font-bold">{day}</span>

              {event && (
                <>
                  <span className="text-xs mt-1">{event.title}</span>
                  {event.link && (
                    <span className="text-[10px] opacity-80 mt-1">
                      Click for details →
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FloatingNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50
                 bg-[#140024]/85 backdrop-blur-md
                 border border-purple-600
                 rounded-full px-8 py-3
                 shadow-[0_8px_30px_rgba(168,85,247,.35)]"
    >
      <div className="flex items-center gap-8 text-sm text-purple-300 font-medium">
        <a href="#mission" className="hover:text-white transition">
          About
        </a>
        <a href="#tracks" className="hover:text-white transition">
          Tracks
        </a>
        <a href="#calendar" className="hover:text-white transition">
          Events
        </a>
        <a
          href="/store"
          className="
    text-purple-300
    hover:text-green-400
    transition
  "
        >
          GRAPE DROP
        </a>
        <a href="#faq" className="hover:text-white transition">
          FAQ
        </a>
        <a href="#join" className="hover:text-white transition">
          Join
        </a>
      </div>
    </motion.nav>
  );
}
function ContactBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 md:bottom-10 right-6 z-50">
      {/* Options */}
      {open && (
        <div className="mb-4 flex flex-col gap-3 items-end">
          <a
            href="https://instagram.com/gr1p5.hub"
            target="_blank"
            className="px-4 py-2 rounded-full
                       bg-[#140024] border border-purple-600
                       text-purple-300 text-sm
                       shadow-[0_0_25px_rgba(124,58,237,.45)]
                       hover:text-green-300 hover:scale-105
                       transition-all"
          >
            Instagram
          </a>

          <a
            href="mailto:grapehub00@gmail.com?subject=Contact%20GRAPE&body=Hello%20GRAPE%20team,"
            className="px-4 py-2 rounded-full
                       bg-[#140024] border border-purple-600
                       text-purple-300 text-sm
                       shadow-[0_0_25px_rgba(124,58,237,.45)]
                       hover:text-green-300 hover:scale-105
                       transition-all"
          >
            Email Us
          </a>
        </div>
      )}

      {/* Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full
                   bg-gradient-to-br from-purple-500 to-green-400
                   text-black text-2xl font-bold
                   shadow-[0_0_35px_rgba(124,58,237,.8)]
                   hover:scale-110
                   transition-all"
      >
        ?
      </button>
    </div>
  );
}
export default function Home() {
  const { addItem } = useCart();
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {};
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);
  return (
    <main className="bg-[#0b0018] text-white">
      <Cursor />;{/* HERO SECTION — INTERACTIVE LANDING */}
      <HeroInteractive />
      <ContactBubble />
      <FloatingNav />
      {/* GRAPE MISSION — ABOUT US */}
      <section
        id="mission"
        className="min-h-screen flex items-center justify-center px-16 py-32 relative overflow-hidden"
      >
        {/* subtle background vibe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]"></div>

        <div className="relative z-10 w-full max-w-6xl text-center">
          <h2
            className="text-7xl font-extrabold mb-20
      bg-gradient-to-r from-purple-400 to-green-400
      text-transparent bg-clip-text"
          >
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div
              className="bg-[#140024] border border-purple-600 rounded-2xl p-10
                      shadow-[0_15px_40px_rgba(168,85,247,.35)]"
            >
              <h3 className="text-2xl text-purple-300 font-bold mb-4">
                Explore Technology
              </h3>
              <p className="text-gray-400">
                We introduce students to real fields like Game Development,
                Robotics, AI, Programming and Engineering through hands-on
                projects.
              </p>
            </div>

            <div
              className="bg-[#140024] border border-purple-600 rounded-2xl p-10
                      shadow-[0_15px_40px_rgba(168,85,247,.35)]"
            >
              <h3 className="text-2xl text-purple-300 font-bold mb-4">
                Build & Compete
              </h3>
              <p className="text-gray-400">
                Students participate in challenges, hackathons and competitions
                that push their creativity and problem-solving skills.
              </p>
            </div>

            <div
              className="bg-[#140024] border border-purple-600 rounded-2xl p-10
                      shadow-[0_15px_40px_rgba(168,85,247,.35)]"
            >
              <h3 className="text-2xl text-purple-300 font-bold mb-4">
                Grow Leaders
              </h3>
              <p className="text-gray-400">
                GRAPE helps students become confident tech leaders ready for the
                future world.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* TRACKS — TECH MODULE BOARD */}
      <section
        id="tracks"
        className="min-h-screen relative flex items-center justify-center px-16 py-32 overflow-hidden"
      >
        {/* section vibe background */}
        <section className="min-h-screen flex flex-col items-center justify-center px-16 py-32">
          {/* Title */}
          <h2
            className="text-7xl font-extrabold mb-20 text-center
    bg-gradient-to-r from-purple-400 to-green-400
    text-transparent bg-clip-text"
          >
            Choose Your Path
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* your 5 cards here */}
          </div>
        </section>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]"></div>

        <div className="relative z-10 w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 gap-10">
          {[
            "Game Development",
            "Robotics",
            "Artificial Intelligence",
            "Programming",
            "Engineering",
          ].map((title, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.05,
              }}
              className="bg-[#140024] border border-purple-600
                   rounded-2xl p-8 h-44
                   flex flex-col justify-center
                   shadow-[0_15px_40px_rgba(168,85,247,.4)]
                   transition-all"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-xl text-purple-300 font-semibold">{title}</h3>

              <p className="text-gray-400 text-sm mt-2">Explore this track</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* UPCOMING EVENTS — COMPACT CALENDAR WITH TEXT */}
      <section id="calendar">
        <EventCalendar />
      </section>
      {/* Store preview*/}
      <section className="py-32 text-center">
        <h2 className="text-5xl font-bold text-purple-300 mb-6">GRAPE DROP</h2>

        <p className="text-gray-400 mb-8">Exclusive merch for GRAPE members.</p>

        <a
          href="/store"
          className="
      px-8 py-4 rounded-full
      bg-purple-600 hover:bg-purple-500
      transition
    "
        >
          Visit Store →
        </a>
      </section>
      {/* FAQ — TECH TOGGLES */}
      <section
        id="faq"
        className="min-h-screen relative flex items-center justify-center px-16 py-32 overflow-hidden"
      >
        {/* background vibe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_60%)]"></div>

        <div className="relative z-10 w-full max-w-4xl text-left">
          <h2
            className="text-6xl font-bold mb-16
    bg-gradient-to-r from-green-400 to-purple-400
    text-transparent bg-clip-text"
          >
            Frequently Asked Questions
          </h2>

          <FAQ />
        </div>
      </section>
      {/* JOIN GRAPE — FINAL CTA */}
      <section
        id="join"
        className="min-h-screen flex items-center justify-center px-16 py-32 relative overflow-hidden"
      >
        {/* background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_60%)]"></div>

        <div className="relative z-10 text-center max-w-3xl">
          <h2
            className="text-7xl font-extrabold
      bg-gradient-to-r from-purple-400 to-green-400
      text-transparent bg-clip-text drop-shadow-[0_0_30px_#a855f7]"
          >
            Join GRAPE
          </h2>

          <p className="mt-8 text-xl text-gray-300">
            Ready to enter the world of Game Development, Robotics, AI,
            Programming and Engineering?
          </p>

          <div className="mt-14 flex flex-col items-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSefY6uUmvuQOx4_XJGZQ8GaI1hsIxBn1l3OtnfMDcSFDiqOFQ/viewform?usp=publish-editor"
              target="_blank"
              className="px-12 py-5 rounded-full
                   bg-purple-600 text-white text-xl font-semibold
                   shadow-[0_0_35px_#a855f7]
                   hover:scale-110 hover:shadow-[0_0_55px_#a855f7]
                   transition-all"
            >
              Enroll Now
            </a>
            <a
              href="https://grape-jwtq.vercel.app"
              className="mt-3 text-lg font-semibold
             text-green-300
             hover:text-purple-300
             transition-all duration-300
             hover:translate-y-[-2px]
             relative
             after:absolute after:left-1/2 after:-bottom-1
             after:h-[2px] after:w-0
             after:bg-gradient-to-r after:from-green-400 after:to-purple-400
             after:transition-all after:duration-300
             hover:after:w-3/4 hover:after:left-1/4"
            >
              Already a member? <span className="ml-1">Go to Dashboard →</span>
            </a>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="py-10 text-center opacity-70">
        Instagram: @gr1p5.hub
      </footer>
    </main>
  );
}
function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const [cartPulse, setCartPulse] = useState(0);
  return (
    <motion.div
      whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-[#140024] border border-purple-600
                 rounded-2xl p-6
                 shadow-[0_0_40px_rgba(168,85,247,.35)]
                 relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* IMAGE */}
      <div className="h-40 flex items-center justify-center mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* INFO */}
      <h3 className="text-lg font-bold text-purple-200">{product.name}</h3>

      <p className="text-green-300 font-semibold mt-1">
        {product.price.toFixed(2)} OMR
      </p>

      {/* BUTTON */}
      <button
        onClick={handleAdd}
        className={`mt-5 w-full py-2 rounded-xl font-semibold
          transition-all
          ${
            added
              ? "bg-green-500 text-black"
              : "bg-purple-600 text-white hover:bg-green-500"
          }`}
      >
        {added ? "Added ✔" : "Add to Cart"}
      </button>

      {/* GLOW */}
      <div
        className="absolute inset-0 pointer-events-none
                   opacity-0 hover:opacity-100 transition
                   bg-[radial-gradient(circle_at_center,rgba(168,85,247,.25),transparent_70%)]"
      />
    </motion.div>
  );
}
