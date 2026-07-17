import * as React from 'react';
import { Typography, Container, Section } from '@earthos/ui';

export const About: React.FC = () => {
  return (
    <Section>
      <Container className="max-w-2xl flex flex-col gap-6">
        <Typography variant="h2">Our Story</Typography>
        <Typography variant="body" className="text-[#B0BEC5] dark:text-[#CBD5E1]">
          Valuable resources are discarded daily because there is no unified database to map, track, and coordinate resource flows. EARTHOS AI was built to solve this informational mismatch.
        </Typography>
        <Typography variant="body" className="text-[#B0BEC5] dark:text-[#CBD5E1]">
          We believe that linear supply chains are a structural inefficiency. Our platform provides the digital passport registry, AI scanners, and co-loading logistics networks to coordinate raw inputs, driving waste down to zero.
        </Typography>
      </Container>
    </Section>
  );
};
export default About;
