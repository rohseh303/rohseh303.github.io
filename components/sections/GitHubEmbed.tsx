'use client';

import { useState } from 'react';
import BorderBox from '@/components/ui/BorderBox';
import aboutData from '@/content/about.json';
import GitHubContributions from './GitHubContributions';

export default function GitHubEmbed() {
  const githubUsername = aboutData.profile.github.replace('github.com/', '');
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  
  return (
    <BorderBox>
      <h2 className="text-xs uppercase tracking-wider mb-6">GITHUB</h2>
      <div className="bg-[#1a1a1a] p-8 border-terminal">
        {/* GitHub contributions calendar - black and white theme with hover tooltips */}
        <div className="mb-4 overflow-visible -mx-2">
          <GitHubContributions username={githubUsername} onTotalChange={setTotalContributions} />
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1">
            {totalContributions !== null && (
              <span className="text-sm text-[#a0a0a0]">
                <span className="text-white font-medium">{totalContributions.toLocaleString()}</span> contributions in the last year
              </span>
            )}
          </div>
          <a 
            href={`https://${aboutData.profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#a0a0a0] hover:text-white transition-colors inline-flex items-center gap-2 flex-shrink-0"
          >
            View Profile →
          </a>
        </div>
      </div>
    </BorderBox>
  );
}
