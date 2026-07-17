import * as React from 'react';
import { Typography, Container, Section, EosCard, EosInput, EosButton } from '@earthos/ui';

export const Contact: React.FC = () => {
  return (
    <Section>
      <Container className="max-w-md flex flex-col gap-6">
        <Typography variant="h2" className="text-center">Get in Touch</Typography>
        <Typography variant="small" className="text-center text-[#B0BEC5] mb-4">
          Have an inquiry about enterprise licensing, smart city deployment, or custom integrations? Write to us.
        </Typography>
        <EosCard variant="glass" className="flex flex-col gap-4">
          <EosInput label="Full Name" placeholder="Jane Doe" />
          <EosInput label="Corporate Email" type="email" placeholder="jane@company.com" />
          <EosInput label="Company Name" placeholder="Acme Corp" />
          <EosInput label="Message" placeholder="How can we help you coordinate resources?" />
          <EosButton variant="primary" className="mt-2 w-full">Send Message</EosButton>
        </EosCard>
      </Container>
    </Section>
  );
};
export default Contact;
