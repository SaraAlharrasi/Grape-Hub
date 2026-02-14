"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./cart-context";
import Link from "next/link";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, increaseQty, decreaseQty } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[380px]
                       bg-[#0b0018] z-50
                       border-l border-purple-700
                       shadow-[0_0_40px_rgba(168,85,247,.45)]
                       p-6 flex flex-col"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-purple-300">Your Cart</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-400 transition"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 space-y-4 overflow-y-auto">
              {items.length === 0 && (
                <p className="text-gray-400 text-sm">Your cart is empty.</p>
              )}

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#140024] border border-purple-600
             rounded-xl p-4 flex justify-between items-center
             transition-all duration-300
             hover:scale-[1.02]
             hover:shadow-[0_0_20px_rgba(168,85,247,.4)]"
                >
                  <div>
                    <p className="text-purple-200 font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.price.toFixed(2)} OMR × {item.qty}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full
               bg-[#0b0018] border border-purple-600
               text-purple-300
               hover:bg-purple-600 hover:text-white
               transition"
                    >
                      −
                    </button>

                    <span className="text-sm font-semibold text-purple-200">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full
               bg-[#0b0018] border border-purple-600
               text-purple-300
               hover:bg-green-500 hover:text-black
               transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            {/* TOTAL */}
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="text-gray-400">Total</span>
              <span className="text-green-300 font-bold">
                {total.toFixed(2)} OMR
              </span>
            </div>

            {/* CHECKOUT */}
            <Link
              href={items.length === 0 ? "#" : "/checkout"}
              onClick={() => {
                if (items.length === 0) return;
                onClose();
              }}
              className={`block w-full py-3 rounded-xl text-center font-semibold
    transition-all
    ${
      items.length === 0
        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
        : "bg-purple-600 text-white hover:bg-green-500"
    }`}
            >
              Go to Checkout
            </Link>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
