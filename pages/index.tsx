import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Display from "@/components/Display";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="grid h-screen grid-rows-7 font-custom">
      <Header />
      <Display />
    </main>
  );
}
