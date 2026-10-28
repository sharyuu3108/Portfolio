import React from 'react';
import { Hero } from '@/components/sections/Chapter00Hero/Hero';
import { Origin } from '@/components/sections/Chapter01Origin/Origin';
import { MachineProjects } from '@/components/sections/Chapter02Machine/MachineProjects';
import { ImaginationDesign } from '@/components/sections/Chapter03Imagination/ImaginationDesign';
import { TechnicalMatrix } from '@/components/sections/Chapter04Matrix/TechnicalMatrix';
import { JourneyTimeline } from '@/components/sections/Chapter05Journey/JourneyTimeline';
import { ConnectionContact } from '@/components/sections/Chapter06Connection/ConnectionContact';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <Origin />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <MachineProjects />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <ImaginationDesign />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <TechnicalMatrix />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <JourneyTimeline />
      <div className="journey-connector" aria-hidden="true">
        <span className="beacon-line" />
        <span className="beacon-dot" />
        <span className="beacon-line" />
      </div>
      <ConnectionContact />
    </>
  );
}
