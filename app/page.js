import Hero from '../components/home/Hero';
import Story from '../components/home/Story';
import Signature from '../components/home/Signature';
import Experience from '../components/home/Experience';
import Branches from '../components/home/Branches';
import Reviews from '../components/home/Reviews';
import QrSection from '../components/home/QrSection';
import Contact from '../components/home/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Signature />
      <Experience />
      <Branches />
      <Reviews />
      <QrSection />
      <Contact />
    </>
  );
}
