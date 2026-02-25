import About from '../components/home/About';
import Hero from '../components/home/Hero';
import JoinMovementNews from '../components/home/JoinMovementNews';
import NewsUpdates from '../components/home/NewsUpdates';
import PartyLeadershipCards from '../components/home/party';
import MetaTags from '../components/layout/MetaTags';
export default async function HomePage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") || "home";

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
