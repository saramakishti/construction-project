import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import HeroSection from '@/components/landing/HeroSection';
import OurServices from '@/components/landing/OurServices';
import Testimonials from '@/components/landing/Testimonials';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <OurServices />
      <Testimonials />
      <Footer />
    </>
  );
}
