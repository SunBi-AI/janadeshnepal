'use client';

import MetaTags from '@/app/components/layout/MetaTags';
import MissionVision from '../../components/about/MissionVision';
import PoliticalPartyTimeline from '../../components/about/PoliticalParty';
import PageHeader from '../../components/layout/PageHeader';

export default function About() {

  return (
    <>
    <MetaTags slug="about" />
    <div className="bg-white">
      <PageHeader slug="about" />
      <MissionVision />
      <PoliticalPartyTimeline />
    </div>
    </>
  );
}
