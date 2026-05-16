import { HelmetProvider } from 'react-helmet-async'; // 1. Importa il provider
import HeroPage from "./HeroPage.jsx";
import PitturePage from "./PitturePage.jsx";
import QuarantAnni from "./QuarantAnni.jsx";
import MapSection from './MapSection';
import ServicesGrid from './ServicesGrid';
import LogoSlider from './LogoSlider';
import Footer from './Footer';

function App() {
  return (
    <HelmetProvider> {/* 2. Avvolgi tutto qui */}
      <main>
        <HeroPage />
        <PitturePage />
        <ServicesGrid />
        <QuarantAnni />
        <LogoSlider />
        <MapSection />
        <Footer />
      </main>
    </HelmetProvider>
  );
}

export default App;