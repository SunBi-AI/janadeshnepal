import About from '../components/home/About';
import Hero from '../components/home/Hero';
import JoinMovementNews from '../components/home/JoinMovementNews';
import NewsUpdates from '../components/home/NewsUpdates';
import PartyLeadershipCards from '../components/home/party';
import MetaTags from '../components/layout/MetaTags';
export default function HomePage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join("/") || "home";

  return (
    <div className='bg-[#fafafa]'>
      <MetaTags slug={slug} />
      <Hero />
      <About/>
      <PartyLeadershipCards/>
      <JoinMovementNews/>
      <NewsUpdates/>
    </div>
  );
}
