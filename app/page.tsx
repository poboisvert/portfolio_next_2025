import Navigation from "@/components/Navigation";
import Hero from "@/components/home/Hero";
import Technologies from "@/components/home/Technologies";
import MvpProcess from "@/components/home/MvpProcess";
import ContactAndBooking from "@/components/home/ContactAndBooking";
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