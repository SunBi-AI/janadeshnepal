import About from '../components/home/About';
import Hero from '../components/home/Hero';
import JoinMovementNews from '../components/home/JoinMovementNews';
import NewsUpdates from '../components/home/NewsUpdates';
import PartyLeadershipCards from '../components/home/party';
export default function HomePage() {

  return (
    <div className='bg-[#fafafa]'>

      <Hero />
      <About/>
      <PartyLeadershipCards/>
      <JoinMovementNews/>
      <NewsUpdates/>
    </div>
  );
}
