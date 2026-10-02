import { VisitorAnalytics, LiveActivityItem } from '../types';

export const initialVisitorAnalytics: VisitorAnalytics = {
  totalVisitors: 485290,
  todayVisitors: 14850,
  totalVisits: 890420,
  todayVisits: 22400,
  pageViews: 1420950,
  todayPageViews: 41800,
  uniqueVisitors: 340120,
  returningVisitors: 145170,
  newVisitors: 340120,
  avgPagesPerVisit: 3.8,
  dailyVisitors: [
    { day: 'Mon', date: '2026-09-26', visitors: 1240, pageViews: 4200 },
    { day: 'Tue', date: '2026-09-27', visitors: 1580, pageViews: 5600 },
    { day: 'Wed', date: '2026-09-28', visitors: 1320, pageViews: 4900 },
    { day: 'Thu', date: '2026-09-29', visitors: 1890, pageViews: 6800 },
    { day: 'Fri', date: '2026-09-30', visitors: 2140, pageViews: 7900 },
    { day: 'Sat', date: '2026-10-01', visitors: 2480, pageViews: 8900 },
    { day: 'Sun', date: '2026-10-02', visitors: 2760, pageViews: 9500 },
  ],
  monthlyVisitors: [
    { month: 'May 2026', visitors: 94000 },
    { month: 'Jun 2026', visitors: 108000 },
    { month: 'Jul 2026', visitors: 115000 },
    { month: 'Aug 2026', visitors: 128000 },
    { month: 'Sep 2026', visitors: 142000 },
    { month: 'Oct 2026', visitors: 158000 },
  ],
  deviceBreakdown: {
    desktop: 42,
    mobile: 52,
    tablet: 6,
  },
  trafficSources: {
    direct: 48,
    search: 28,
    social: 18,
    referral: 6,
  },
};

export const initialLiveActivity: LiveActivityItem[] = [
  { id: 'act-1', userText: '18 readers currently viewing', action: 'Hyderabad Main Edition (02 Oct 2026)', timeAgo: 'Just now', badgeType: 'epaper' },
  { id: 'act-2', userText: '12 readers viewing', action: 'IT Expansion News Article', timeAgo: '1 min ago', badgeType: 'news' },
  { id: 'act-3', userText: '9 readers opened', action: 'Warangal Heritage Edition', timeAgo: '3 mins ago', badgeType: 'epaper' },
  { id: 'act-4', userText: '5 readers shared', action: 'T20 Cricket Match Victory News', timeAgo: '5 mins ago', badgeType: 'share' },
  { id: 'act-5', userText: '7 readers opened', action: 'Vijayawada Capital Edition', timeAgo: '7 mins ago', badgeType: 'epaper' },
  { id: 'act-6', userText: '14 readers downloaded', action: 'Hyderabad 02-10-2026 E-Paper PDF', timeAgo: '10 mins ago', badgeType: 'epaper' },
];
