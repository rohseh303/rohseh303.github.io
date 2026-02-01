'use client';

import { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export default function GitHubContributions({ username, onTotalChange }: { username: string; onTotalChange?: (total: number) => void }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total contributions (must be before any early returns)
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);

  // Notify parent of total changes (must be before any early returns)
  useEffect(() => {
    if (totalContributions > 0 && onTotalChange) {
      onTotalChange(totalContributions);
    }
  }, [totalContributions, onTotalChange]);

  useEffect(() => {
    const fetchContributions = async () => {
      console.log('🔍 [GitHubContributions] Fetching for username:', username);
      try {
        // Use public API - no authentication needed
        const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
        console.log('📡 [GitHubContributions] API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('📥 [GitHubContributions] Response status:', response.status, response.statusText);
        
        if (response.ok) {
          const data = await response.json();
          console.log('📊 [GitHubContributions] API Response:', data);
          console.log('📊 [GitHubContributions] Data keys:', Object.keys(data));
          console.log('📊 [GitHubContributions] Has contributions?', !!data.contributions);
          
          const contribs: ContributionDay[] = [];
          
          if (data.contributions) {
            console.log('📊 [GitHubContributions] Contributions type:', Array.isArray(data.contributions) ? 'array' : 'object');
            console.log('📊 [GitHubContributions] Contributions count:', Array.isArray(data.contributions) ? data.contributions.length : Object.keys(data.contributions).length);
            
            // Handle both array and object formats
            if (Array.isArray(data.contributions)) {
              // API returns array of { date, count, level }
              data.contributions.forEach((day: any) => {
                contribs.push({
                  date: day.date,
                  count: day.count || 0,
                  level: day.level || 0,
                });
              });
            } else {
              // Fallback: handle object format { "2024-01-01": { count: 5, level: 2 } }
              Object.keys(data.contributions).forEach((date) => {
                const day = data.contributions[date];
                contribs.push({
                  date,
                  count: day.count || 0,
                  level: day.level || 0,
                });
              });
            }
            
            console.log('✅ [GitHubContributions] Processed contributions:', contribs.length);
            
            if (contribs.length > 0) {
              const sorted = contribs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              setContributions(sorted);
              setError(null);
              console.log('✅ [GitHubContributions] Contributions set successfully, count:', sorted.length);
            } else {
              console.warn('⚠️ [GitHubContributions] No contributions found in data');
              setError('No contribution data available');
            }
          } else {
            console.error('❌ [GitHubContributions] Invalid data format - no contributions key');
            console.error('❌ [GitHubContributions] Data structure:', JSON.stringify(data, null, 2));
            setError('Invalid data format from API');
          }
        } else {
          const errorText = await response.text();
          console.error('❌ [GitHubContributions] API Error:', response.status, errorText);
          setError(`Unable to load contribution data (${response.status})`);
        }
      } catch (error) {
        console.error('❌ [GitHubContributions] Failed to fetch contributions:', error);
        setError('Failed to load contributions. Please try again later.');
      } finally {
        setLoading(false);
        console.log('🏁 [GitHubContributions] Loading complete');
      }
    };

    if (username) {
      fetchContributions();
    } else {
      console.warn('⚠️ [GitHubContributions] No username provided');
      setError('No username provided');
      setLoading(false);
    }
  }, [username]);

  console.log('🎨 [GitHubContributions] Render state:', { loading, error, contributionsCount: contributions.length });

  if (loading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <p className="text-sm text-[#a0a0a0]">Loading contributions...</p>
      </div>
    );
  }

  if (error || contributions.length === 0) {
    console.log('⚠️ [GitHubContributions] Showing error/empty state:', { error, contributionsCount: contributions.length });
    return (
      <div className="w-full h-32 flex flex-col items-center justify-center border border-[#333] p-4">
        <p className="text-sm text-[#a0a0a0] mb-2">{error || 'No contribution data available'}</p>
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#666] hover:text-white transition-colors"
        >
          View on GitHub →
        </a>
      </div>
    );
  }

  // Generate the calendar grid (last 365 days)
  const today = new Date();
  const days: ContributionDay[] = [];
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const contrib = contributions.find(c => c.date === dateStr);
    days.push(contrib || { date: dateStr, count: 0, level: 0 });
  }

  // Group by weeks (53 weeks for a year)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  console.log('📅 [GitHubContributions] Calendar grid:', { daysCount: days.length, weeksCount: weeks.length });

  const getColor = (level: number) => {
    // Black and white theme - lighter shades for visibility on dark background
    const colors = [
      '#1a1a1a', // No contributions - same as background (invisible)
      '#333333', // Level 1 - visible gray
      '#4a4a4a', // Level 2 - lighter gray
      '#666666', // Level 3 - medium gray
      '#808080', // Level 4 - light gray
    ];
    return colors[level] || colors[0];
  };

  const handleSquareHover = (e: React.MouseEvent<SVGRectElement>, day: ContributionDay) => {
    // Use pageX/pageY for more accurate positioning (accounts for scroll)
    setHoveredDay({
      date: day.date,
      count: day.count,
      x: e.pageX,
      y: e.pageY,
    });
  };

  // Update tooltip position as mouse moves within the square
  const handleSquareMove = (e: React.MouseEvent<SVGRectElement>, day: ContributionDay) => {
    if (hoveredDay && hoveredDay.date === day.date) {
      setHoveredDay({
        date: day.date,
        count: day.count,
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const handleSquareLeave = () => {
    setHoveredDay(null);
  };

  console.log('🎨 [GitHubContributions] Rendering SVG calendar with', weeks.length, 'weeks');

  // Larger squares to fill more space - increased size and spacing
  const squareSize = 20;
  const spacing = 22; // Slightly larger spacing for better visibility
  const svgWidth = weeks.length * spacing;
  const svgHeight = 7 * spacing; // 7 days per week

  return (
    <div className="relative w-full min-h-[154px]">
      <svg 
        width="100%" 
        height={svgHeight} 
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
        className="overflow-visible" 
        style={{ display: 'block', width: '100%', maxWidth: '100%' }}
        preserveAspectRatio="none"
      >
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const x = weekIndex * spacing;
            const y = dayIndex * spacing;
            
            return (
              <rect
                key={`${day.date}-${dayIndex}`}
                x={x}
                y={y}
                width={squareSize}
                height={squareSize}
                fill={getColor(day.level)}
                rx="2"
                onMouseEnter={(e) => handleSquareHover(e, day)}
                onMouseMove={(e) => handleSquareMove(e, day)}
                onMouseLeave={handleSquareLeave}
                className="cursor-pointer"
              />
            );
          })
        )}
      </svg>
      {weeks.length === 0 && (
        <div className="text-xs text-[#666] text-center mt-2">
          No calendar data to render
        </div>
      )}
      
      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 bg-[#1a1a1a] border border-white px-3 py-2 text-xs pointer-events-none whitespace-nowrap"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: 'translate(-50%, calc(-100% - 8px))',
          }}
        >
          <div className="text-white font-medium">
            {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
          </div>
          <div className="text-[#a0a0a0]">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      )}
    </div>
  );
}
