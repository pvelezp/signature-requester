import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./layout.client";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sign Requester",
  description: "Send documents to signers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
