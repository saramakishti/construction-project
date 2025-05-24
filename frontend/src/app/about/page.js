import Navbar from '@/components/global/Navbar';
import Introduction from '@/components/about-us/Introduction';
import OurTeam from '@/components/about-us/OurTeam';
import Footer from '@/components/global/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <Introduction />
      <OurTeam />
      <Footer />
    </>
  );
}
