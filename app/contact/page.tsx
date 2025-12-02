import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { LocationMap } from "@/components/contact/LocationMap";
import { QuickLinks } from "@/components/contact/QuickLinks";
import { FAQList } from "@/components/faq/FAQList";

export const metadata: Metadata = {
  title: "Contact Us | Get Custom Quote | Infrascapes",
  description: "Contact Infrascapes for outdoor furniture and design-build solutions. Get custom quotes, schedule consultations, or visit our Hyderabad showroom.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ContactHero />
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
        <LocationMap />
        <h1 className="text-4xl md:text-5xl font-bold  text-center w-full mt-10 mb-[-35px]">
          Frequently Asked Questions
        </h1>
        <FAQList />
        {/* <QuickLinks /> */}
      </main>
      <Footer />
    </>
  );
}