import type { PropsWithChildren } from "react";
import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-full grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <Navigation />
      {children}
      <Footer />
    </main>
  );
}
