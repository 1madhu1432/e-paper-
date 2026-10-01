export interface DailyTraffic {
  date: string;
  visitors: number;
  pageViews: number;
  epaperViews: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface DeviceDistribution {
  name: string;
  percentage: number;
  color: string;
}

export interface CategoryMetric {
  category: string;
  categoryTe: string;
  views: number;
  percentage: number;
}

export interface DistrictReadership {
  district: string;
  state: 'Telangana' | 'Andhra Pradesh';
  readers: number;
}

export const MOCK_DAILY_TRAFFIC: DailyTraffic[] = [
  { date: 'Sep 18', visitors: 142000, pageViews: 410000, epaperViews: 28000 },
  { date: 'Sep 19', visitors: 156000, pageViews: 445000, epaperViews: 31000 },
  { date: 'Sep 20', visitors: 168000, pageViews: 489000, epaperViews: 33500 },
  { date: 'Sep 21', visitors: 182000, pageViews: 520000, epaperViews: 36000 },
  { date: 'Sep 22', visitors: 175000, pageViews: 495000, epaperViews: 34000 },
  { date: 'Sep 23', visitors: 191000, pageViews: 542000, epaperViews: 38200 },
  { date: 'Sep 24', visitors: 204000, pageViews: 585000, epaperViews: 41000 },
  { date: 'Sep 25', visitors: 215000, pageViews: 612000, epaperViews: 43500 },
  { date: 'Sep 26', visitors: 228000, pageViews: 648000, epaperViews: 46200 },
  { date: 'Sep 27', visitors: 242000, pageViews: 690000, epaperViews: 49000 },
  { date: 'Sep 28', visitors: 265000, pageViews: 750000, epaperViews: 54000 },
  { date: 'Sep 29', visitors: 280000, pageViews: 795000, epaperViews: 57500 },
  { date: 'Sep 30', visitors: 310000, pageViews: 880000, epaperViews: 63000 },
  { date: 'Oct 01', visitors: 345000, pageViews: 960000, epaperViews: 71000 },
];

export const MOCK_TRAFFIC_SOURCES: TrafficSource[] = [
  { name: 'Google Search / Discover', value: 46, color: '#4285F4' },
  { name: 'Direct (Web & PWA)', value: 24, color: '#dc2626' },
  { name: 'WhatsApp & Telegram Sharing', value: 16, color: '#25D366' },
  { name: 'Social (YouTube, X, FB, Insta)', value: 10, color: '#8b5cf6' },
  { name: 'News Aggregators (Dailyhunt, Opera)', value: 4, color: '#f59e0b' },
];

export const MOCK_DEVICE_SPLIT: DeviceDistribution[] = [
  { name: 'Mobile Smartphone', percentage: 76, color: '#dc2626' },
  { name: 'Desktop & Laptop', percentage: 19, color: '#2563eb' },
  { name: 'Tablet & iPad', percentage: 5, color: '#10b981' },
];

export const MOCK_CATEGORY_METRICS: CategoryMetric[] = [
  { category: 'Telangana', categoryTe: 'తెలంగాణ', views: 320000, percentage: 24 },
  { category: 'Andhra Pradesh', categoryTe: 'ఆంధ్రప్రదేశ్', views: 285000, percentage: 21 },
  { category: 'Cinema', categoryTe: 'సినిమా', views: 240000, percentage: 18 },
  { category: 'Politics', categoryTe: 'రాజకీయాలు', views: 195000, percentage: 15 },
  { category: 'Jobs & Education', categoryTe: 'ఉద్యోగాలు & విద్య', views: 160000, percentage: 12 },
  { category: 'Sports', categoryTe: 'క్రీడలు', views: 85000, percentage: 6 },
  { category: 'Business & Crime', categoryTe: 'వ్యాపారం & క్రైమ్', views: 55000, percentage: 4 },
];

export const MOCK_DISTRICT_READERSHIP: DistrictReadership[] = [
  { district: 'హైదరాబాద్ (Hyderabad)', state: 'Telangana', readers: 485000 },
  { district: 'విజయవాడ / కృష్ణా (Krishna)', state: 'Andhra Pradesh', readers: 295000 },
  { district: 'విశాఖపట్నం (Visakhapatnam)', state: 'Andhra Pradesh', readers: 260000 },
  { district: 'వరంగల్ (Warangal)', state: 'Telangana', readers: 195000 },
  { district: 'గుంటూరు (Guntur)', state: 'Andhra Pradesh', readers: 180000 },
  { district: 'తిరుపతి / చిత్తూరు (Tirupati)', state: 'Andhra Pradesh', readers: 165000 },
  { district: 'కరీంనగర్ (Karimnagar)', state: 'Telangana', readers: 140000 },
  { district: 'కర్నూలు (Kurnool)', state: 'Andhra Pradesh', readers: 125000 },
  { district: 'ఖమ్మం (Khammam)', state: 'Telangana', readers: 110000 },
  { district: 'నల్లగొండ (Nalgonda)', state: 'Telangana', readers: 98000 },
];
