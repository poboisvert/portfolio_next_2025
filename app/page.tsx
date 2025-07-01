import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Technologies from "@/components/Technologies";
import MvpProcess from "@/components/MvpProcess";
import ContactAndBooking from "@/components/ContactAndBooking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
      <Navigation />
      <Hero />
      <Technologies />
      <MvpProcess />
      <ContactAndBooking />
      <Footer />
    </main>
  );
}