'use client';

import MissionVision from '../../components/about/MissionVision';
import PoliticalPartyTimeline from '../../components/about/PoliticalParty';
import PageHeader from '../../components/layout/PageHeader';

export default function About() {

  return (
    <div className="bg-white">
<PageHeader slug="about" />
      <MissionVision />
      <PoliticalPartyTimeline />
    </div>
  );
}
