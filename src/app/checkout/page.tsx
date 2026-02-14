"use client";

import { useCart } from "../cart-context";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

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
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
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
export default function CheckoutPage() {
  <Cursor />;
  const { items, clearCart } = useCart();
  const [orderId, setOrderId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const grade = (form.elements.namedItem("grade") as HTMLInputElement).value;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        grade,
        items,
        total,
      }),
    });
    const result = await res.json();
    // Save order to dashboard storage
    const existingOrders = JSON.parse(
      localStorage.getItem("grape-orders") || "[]",
    );

    existingOrders.push(result.order);

    localStorage.setItem("grape-orders", JSON.stringify(existingOrders));
    setOrderId(result.orderId);

    if (res.ok) {
      clearCart();
      setSubmitted(true);
    } else {
      alert("Failed to send order.");
    }
  };

  if (submitted) {
    return (
      <main
        className="min-h-screen bg-[#0b0018] text-white
                       flex flex-col items-center justify-center text-center"
      >
        <Cursor />
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-extrabold
                     bg-gradient-to-r from-purple-400 to-green-400
                     text-transparent bg-clip-text"
        >
          Order Placed 🎉
          <p className="text-green-400 text-xl mt-4">Order ID: {orderId}</p>
        </motion.h1>

        <p className="mt-6 text-gray-300">
          Your GRAPE gear will be ready soon.
        </p>

        <Link
          href="/"
          className="mt-10 text-green-300 hover:text-purple-300 transition"
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0018] text-white px-10 py-24">
      <Cursor />

      {/* BACK */}
      <Link
        href="/"
        className="text-green-300 hover:text-purple-300 transition"
      >
        ← Back to Home
      </Link>

      <h1
        className="text-6xl font-extrabold mt-10 mb-16
        bg-gradient-to-r from-purple-400 to-green-400
        text-transparent bg-clip-text"
      >
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* CART SUMMARY */}
        <div className="space-y-6">
          {items.length === 0 && (
            <p className="text-gray-400">Your cart is empty.</p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#140024] border border-purple-600
                         rounded-xl p-6 flex justify-between"
            >
              <div>
                <p className="text-purple-200 font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {(item.price * item.qty).toFixed(2)} OMR
                </p>
              </div>

              <p className="text-green-300 font-bold">
                {(item.price * item.qty).toFixed(2)} OMR
              </p>
            </div>
          ))}

          <div
            className="text-right text-2xl font-bold
                       text-green-300 mt-6"
          >
            Total: {total.toFixed(2)} OMR
          </div>
        </div>

        {/* STUDENT INFO */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#140024] border border-purple-600
                     rounded-2xl p-10
                     shadow-[0_0_40px_rgba(168,85,247,.4)]
                     space-y-6"
        >
          <h2 className="text-2xl font-bold text-purple-300">
            Student Information
          </h2>

          <input
            name="name"
            required
            placeholder="Full Name"
            className="w-full px-5 py-4 rounded-xl
             bg-[#0b0018]
             border border-purple-600
             text-white text-lg
             focus:outline-none
             focus:border-green-400
             focus:shadow-[0_0_20px_rgba(34,229,139,.4)]
             transition"
          />

          <input
            name="email"
            required
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-4 rounded-xl
             bg-[#0b0018]
             border border-purple-600
             text-white text-lg
             focus:outline-none
             focus:border-green-400
             focus:shadow-[0_0_20px_rgba(34,229,139,.4)]
             transition"
          />

          <input
            name="grade"
            placeholder="Class / Grade"
            className="w-full px-5 py-4 rounded-xl
             bg-[#0b0018]
             border border-purple-600
             text-white text-lg
             focus:outline-none
             focus:border-green-400
             focus:shadow-[0_0_20px_rgba(34,229,139,.4)]
             transition"
          />
          <button
            type="submit"
            className="w-full mt-6 py-4 rounded-xl
                       bg-purple-600 text-white text-lg font-semibold
                       hover:bg-green-500
                       transition-all shadow-[0_0_30px_#a855f7]"
          >
            Place Order
          </button>
        </form>
      </div>
    </main>
  );
}
