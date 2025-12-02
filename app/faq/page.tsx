import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQHero } from "@/components/faq/FAQHero";
import { FAQList } from "@/components/faq/FAQList";

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions | Infrascapes",
  description: "Find answers to common questions about Infrascapes products, services, ordering process, and more.",
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <FAQHero />
        <FAQList />
      </main>
      <Footer />
    </>
  );
}