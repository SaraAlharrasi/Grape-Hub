"use client";

import { useCart } from "../cart-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ---------------- CURSOR ---------------- */

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

/* ---------------- PRODUCTS ---------------- */

const products = [
  {
    id: "hoodie",
    name: "GRAPE Hoodie",
    price: 15,
    image: "/store/hoodie.png",
  },
  {
    id: "mug",
    name: "GRAPE Mug",
    price: 4,
    image: "/store/mug.png",
  },
  {
    id: "flask",
    name: "GRAPE Flask",
    price: 6,
    image: "/store/flask.png",
  },
  {
    id: "sticker",
    name: "Sticker Pack",
    price: 1.5,
    image: "/store/sticker.png",
  },
  {
    id: "tote",
    name: "GRAPE Tote Bag",
    price: 5,
    image: "/store/tote-bag.png",
  },
  {
    id: "brooch",
    name: "GRAPE Brooch",
    price: 2,
    image: "/store/brooch.png",
  },
  {
    id: "mousepad",
    name: "GRAPE Mouse Pad",
    price: 4.5,
    image: "/store/mouse-pad.png",
  },
];

/* ---------------- PAGE ---------------- */

export default function StorePage() {
  const { items, addItem, removeItem, increaseQty, decreaseQty } = useCart();

  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <main className="min-h-screen bg-[#0b0018] text-white px-6 py-16">
      <Cursor />

      {/* BACK BUTTON */}

      <Link
        href="/"
        className="text-purple-300 hover:text-green-400 mb-12 inline-block"
      >
        ← Back to Home
      </Link>

      {/* TITLE */}

      <h1
        className="
        text-6xl font-extrabold text-center mb-16
        bg-gradient-to-r from-purple-400 to-green-400
        text-transparent bg-clip-text
      "
      >
        GRAPE DROP
      </h1>

      {/* PRODUCT GRID */}

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product) => {
          const added = items.find((i) => i.id === product.id);

          return (
            <motion.div
              key={product.id}
              whileHover={{
                scale: 1.05,
                rotateX: 6,
                rotateY: -6,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="
              bg-[#140024]
              border border-purple-600
              rounded-2xl
              p-6
              shadow-[0_0_40px_rgba(168,85,247,.35)]
              "
            >
              {/* IMAGE */}

              <div className="h-44 flex items-center justify-center mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* NAME */}

              <div className="text-center w-full mt-2">
                <h3 className="text-xl font-bold text-purple-200">
                  {product.name}
                </h3>

                {/* PRICE */}

                <p className="text-green-400 font-semibold mt-1 text-lg">
                  {product.price.toFixed(2)} OMR
                </p>
              </div>

              {/* ADD BUTTON */}

              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                  })
                }
                className="
                mt-4 w-full py-2 rounded-xl font-semibold
                bg-purple-600 hover:bg-green-500
                transition-all
                "
              >
                Add to Cart
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* FLOATING CART BUTTON */}

      <button
        onClick={() => setCartOpen(true)}
        className="
        fixed bottom-8 right-8
        w-16 h-16
        rounded-full
        bg-gradient-to-br from-purple-500 to-green-400
        text-black text-2xl
        shadow-[0_0_35px_rgba(168,85,247,.9)]
        hover:scale-110
        transition-all
        z-50
        "
      >
        🛒
        {cartCount > 0 && (
          <span
            className="
            absolute -top-2 -right-2
            w-6 h-6
            bg-green-400 text-black
            text-xs font-bold
            rounded-full
            flex items-center justify-center
            "
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* CART DRAWER */}

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.3 }}
            className="
            fixed right-0 top-0
            h-full w-80
            bg-[#140024]
            border-l border-purple-600
            p-6
            z-50
            "
          >
            {/* CLOSE */}

            <button
              onClick={() => setCartOpen(false)}
              className="mb-6 text-gray-400 hover:text-red-400"
            >
              ✕ Close
            </button>

            {/* TITLE */}

            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

            {/* ITEMS */}

            {items.length === 0 && (
              <p className="text-gray-400">Cart is empty</p>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="
      mb-4
      p-3
      rounded-xl
      bg-[#1a0030]
      border border-purple-700
    "
              >
                {/* NAME */}
                <p className="font-semibold text-purple-200">{item.name}</p>

                {/* CONTROLS */}
                <div className="flex items-center justify-between mt-2">
                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="
            w-8 h-8
            rounded-full
            bg-purple-700
            hover:bg-red-500
            transition
          "
                    >
                      −
                    </button>

                    <span className="font-bold text-lg">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="
            w-8 h-8
            rounded-full
            bg-purple-700
            hover:bg-green-500
            transition
          "
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <p className="text-green-400 font-bold">
                    {(item.qty * item.price).toFixed(2)} OMR
                  </p>
                </div>
              </div>
            ))}

            {/* TOTAL */}

            <p className="mt-6 font-bold text-lg">
              Total: {total.toFixed(2)} OMR
            </p>

            {/* CHECKOUT */}

            <Link
              href="/checkout"
              className="
              block mt-6
              bg-green-500
              hover:bg-green-400
              text-black
              py-3
              text-center
              rounded-xl
              font-bold
              transition
              "
            >
              Checkout
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
