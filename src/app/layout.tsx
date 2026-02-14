import "./globals.css";
import { CartProvider } from "./cart-context";

export const metadata = {
  title: "GRAPE Tech Club",
  description:
    "GRAPE is a student tech club focused on AI, robotics, and programming.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
