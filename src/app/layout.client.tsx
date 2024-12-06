"use client";

import Header from "@/components/ui/header/header";
import { Toaster } from "@/components/ui/toaster";
import BackButton from "./components/back-button/back-button";
import { DocumentProvider } from "./context/documents-provider";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DocumentProvider>
      <Header />
      <BackButton />
      <div className="max-w-4xl mx-auto">{children}</div>
      <Toaster />
    </DocumentProvider>
  );
}
