import Carousel from '@/components/home/Carousel';
import SeckillBanner from '@/components/home/SeckillBanner';
import FeaturedSection from '@/components/home/FeaturedSection';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <Carousel />
      <SeckillBanner />
      <FeaturedSection />
    </div>
  );
}
