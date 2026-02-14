"use client";

import { useEffect, useState } from "react";

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
export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("grape-orders") || "[]");

    setOrders(saved.reverse());
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0018] text-white p-10">
      <Cursor />

      <h1
        className="
        text-5xl font-bold mb-10
        bg-gradient-to-r from-purple-400 to-green-400
        text-transparent bg-clip-text
      "
      >
        GRAPE Admin Dashboard
      </h1>

      {orders.length === 0 && <p className="text-gray-400">No orders yet.</p>}

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="
              bg-[#140024]
              border border-purple-600
              rounded-xl
              p-6
              shadow-[0_0_20px_rgba(168,85,247,0.3)]
            "
          >
            <div className="flex justify-between">
              <div>
                <p className="text-green-400 font-bold">{order.orderId}</p>

                <p>{order.name}</p>

                <p className="text-gray-400 text-sm">{order.email}</p>

                <p className="text-gray-400 text-sm">Grade {order.grade}</p>
              </div>

              <div className="text-right">
                <p className="text-purple-400 font-bold">{order.total} OMR</p>

                <p className="text-gray-500 text-sm">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4">
              {order.items.map((item: any, i: number) => (
                <p key={i} className="text-gray-300 text-sm">
                  {item.name} × {item.qty}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
