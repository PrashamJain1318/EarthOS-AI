import * as React from 'react';
import { Typography, EosCard, EosInput, EosButton } from '@earthos/ui';
import { Sparkles, Send } from 'lucide-react';

export const EarthGPT: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 h-[80vh]">
      <div>
        <Typography variant="h3">EarthGPT Assistant</Typography>
        <Typography variant="small" className="text-[#B0BEC5]">AI chatbot trained on material logistics, circularity regulations, and repair manuals.</Typography>
      </div>

      <EosCard variant="glass" className="flex-1 flex flex-col justify-between p-6">
        {/* Chat Feed */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex gap-3 items-start max-w-lg bg-green-500/5 dark:bg-[#162033]/30 p-4 rounded-2xl border border-[#2E7D32]/10">
            <Sparkles size={18} className="text-[#2E7D32] shrink-0 mt-1" />
            <div className="flex flex-col gap-1">
              <Typography variant="small" className="font-semibold text-[#1F2937] dark:text-[#F8FAFC]">EarthGPT</Typography>
              <Typography variant="small" className="text-[#B0BEC5]">
                Hello. I can assist you with chemical configurations, local compliance regulations, or repair manual diagnostics. Ask me anything.
              </Typography>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex gap-3 items-center mt-4">
          <EosInput placeholder="Ask EarthGPT about material compliance..." className="flex-1" />
          <EosButton variant="primary" className="p-3"><Send size={18} /></EosButton>
        </div>
      </EosCard>
    </div>
  );
};
export default EarthGPT;
