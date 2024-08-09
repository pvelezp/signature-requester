"use client";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header/header";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const AccessButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/dashboard");
      }}
      className="bg-lightblue py-9 sm:py-7 px-10 sm:px-6 text-lg"
    >
      Acceder
      <ArrowRight size={20} className="ml-1" />
    </Button>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-blue">
      <Header
        isInitialPage
        action={
          <div className="hidden sm:block">
            <AccessButton />
          </div>
        }
      />

      <section className="flex-grow bg-blue py-12 sm:py-24 px-6 bg-background-pattern bg-no-repeat bg-center bg-contain">
        <div className="max-w-lg">
          <h1 className="md:text-6xl text-4xl  font-bold mb-6 text-white text-center sm:text-left">
            Bienvenido a Galactic Corp
          </h1>

          <p className="text-lg mb-10 text-white text-center sm:text-left">
            Explorando nuevas fronteras del espacio, elevando la humanidad hacia
            un futuro ilimitado 🚀
          </p>
        </div>

        <div className="flex justify-center sm:justify-start mt-20">
          <AccessButton />
        </div>
      </section>
    </main>
  );
}
