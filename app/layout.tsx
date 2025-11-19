import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salience - Organizational Memory & Coordination Engine",
  description: "An organizational memory and coordination engine that maximizes throughput toward your company's goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-black"
      >
        {children}
      </body>
    </html>
  );
}
