export type Role = 'Super Admin' | 'Editor-in-Chief' | 'Editor' | 'Reporter' | 'Social Media Manager' | 'Reader';

export type ArticleStatus = 'draft' | 'pending' | 'pending_review' | 'published' | 'rejected' | 'archived';

export interface State {
  id: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  subEditionCount?: number;
}

export interface SubEdition {
  id: string;
  stateId: string;
  stateName: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
}

export interface Edition {
  id: string;
  stateId: string;
  subEditionId: string;
  stateName: string;
  subEditionName: string;
  name: string;
  description: string;
  thumbnail: string;
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  nameTe: string;
  slug: string;
  color: string;
  icon?: string;
  description?: string;
}

export interface EPaperPageItem {
  pageNumber: number;
  imageUrl: string;
  title: string;
  category?: string;
  viewsCount?: number;
  uniqueReaders?: number;
  avgTimeSeconds?: number;
}

export interface EPaper {
  id: string;
  title?: string;
  date: string; // YYYY-MM-DD
  stateId?: string;
  subEditionId?: string;
  editionId?: string;
  stateName?: string;
  subEditionName?: string;
  editionName: string;
  editionNameTe?: string;
  district?: string;
  volume?: string;
  issue?: string;
  totalPages: number;
  pages: EPaperPageItem[];
  coverImage: string;
  pdfUrl: string;
  fileSize?: string;
  status: 'published' | 'draft' | 'archived';
  views: number;
  readers?: number;
  downloads: number;
  shares?: number;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleTe: string;
  summary: string;
  summaryTe: string;
  content: string;
  contentTe: string;
  category: string;
  subcategory?: string;
  stateId?: string;
  stateName?: string;
  subEditionId?: string;
  subEditionName?: string;
  district?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  imageUrl: string;
  imageCaption?: string;
  gallery?: string[];
  videoUrl?: string;
  status: ArticleStatus;
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  views: number;
  uniqueReaders?: number;
  shares?: number;
  averageReadingTime?: string;
  dailyViews?: { date: string; views: number }[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  socialCaption?: string;
  editorComments?: string;
}

export interface NewsTip {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  district: string;
  issueType: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  status: string;
  submittedAt: string;
  moderatorNotes?: string;
  convertedArticleId?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  titleTe: string;
  message: string;
  messageTe: string;
  category: string;
  imageUrl?: string;
  targetAudience: string;
  scheduledTime?: string;
  sentAt?: string;
  status: string;
  clicks: number;
  reach: number;
}

export interface VideoItem {
  id: string;
  title: string;
  titleTe: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  category: string;
  duration: string;
  reporterName: string;
  publishedAt: string;
  isFeatured: boolean;
  isBreaking: boolean;
  views: number;
  type: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  createdAt: string;
  likes: number;
}

export interface DailyVisitorStat {
  day: string;
  date: string;
  visitors: number;
  pageViews: number;
}

export interface MonthlyVisitorStat {
  month: string;
  visitors: number;
}

export interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
}

export interface TrafficSources {
  direct: number;
  search: number;
  social: number;
  referral: number;
}

export interface VisitorAnalytics {
  totalVisitors: number;
  todayVisitors: number;
  totalVisits: number;
  todayVisits: number;
  pageViews: number;
  todayPageViews: number;
  uniqueVisitors: number;
  returningVisitors: number;
  newVisitors: number;
  avgPagesPerVisit: number;
  dailyVisitors: DailyVisitorStat[];
  monthlyVisitors: MonthlyVisitorStat[];
  deviceBreakdown: DeviceBreakdown;
  trafficSources: TrafficSources;
}

export interface LiveActivityItem {
  id: string;
  userText: string;
  action: string;
  timeAgo: string;
  badgeType: 'epaper' | 'news' | 'share';
}

export interface Reporter {
  id: string;
  name: string;
  nameTe: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  district: string;
  articlesCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar: string;
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  district?: string;
  permissions?: {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    canPublish: boolean;
    canManageAds?: boolean;
    canManageEPaper: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    canChangeSettings: boolean;
  };
}

export interface UserPreferences {
  savedArticleIds: string[];
  favoriteCategories: string[];
  notificationsEnabled: boolean;
  notificationCategories: string[];
  preferredDistrict: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  logoUrl: string;
  defaultState: string;
  defaultSubEdition: string;
  defaultEdition: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
    telegram: string;
  };
  readerSettings: {
    defaultZoom: number;
    autoFitWidth: boolean;
    showPageThumbnails: boolean;
  };
}
