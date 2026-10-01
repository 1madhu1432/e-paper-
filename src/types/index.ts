export type Role = 'Super Admin' | 'Editor-in-Chief' | 'Editor' | 'Reporter' | 'Social Media Manager' | 'Reader';

export type ArticleStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'archived';

export interface Category {
  id: string;
  name: string;
  nameTe: string;
  slug: string;
  color: string;
  icon?: string;
  description?: string;
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

export type AdPlacement = 
  | 'home-top' 
  | 'home-middle' 
  | 'home-bottom' 
  | 'category-top' 
  | 'category-middle' 
  | 'article-top' 
  | 'article-middle' 
  | 'article-bottom' 
  | 'sidebar' 
  | 'mobile-sticky'
  | 'sponsored-card';

export interface Advertisement {
  id: string;
  sponsorName: string;
  campaignName: string;
  adTitle: string;
  desktopBanner: string;
  mobileBanner: string;
  targetUrl: string;
  placement: AdPlacement;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'active' | 'paused' | 'expired';
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  impressionLimit?: number;
  clickLimit?: number;
  revenue: number;
}

export interface EPaperPage {
  pageNumber: number;
  imageUrl: string;
  title: string;
}

export interface EPaper {
  id: string;
  editionName: string;
  editionNameTe: string;
  district: string;
  date: string;
  coverImage: string;
  pdfUrl: string;
  pages: EPaperPage[];
  totalPages: number;
  status: 'published' | 'draft' | 'archived';
  views: number;
  downloads: number;
  createdAt: string;
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
  type: 'Short News' | 'Daily Bulletin' | 'Ground Report';
}

export interface NewsTip {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  district: string;
  issueType: 'Crime' | 'Civic Problem' | 'Corruption' | 'Accident' | 'Politics' | 'Other';
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  status: 'New' | 'Under Review' | 'Verified' | 'Rejected' | 'Converted to Article';
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
  targetAudience: 'All Users' | 'Telangana' | 'Andhra Pradesh' | 'Hyderabad' | 'App Users';
  scheduledTime?: string;
  sentAt?: string;
  status: 'sent' | 'scheduled' | 'draft';
  clicks: number;
  reach: number;
}

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'X' | 'YouTube' | 'WhatsApp' | 'Telegram';
  content: string;
  mediaUrl?: string;
  articleId?: string;
  scheduledTime: string;
  status: 'published' | 'scheduled' | 'failed' | 'draft';
  engagements?: number;
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  url: string;
  size: string;
  dimensions?: string;
  uploadedAt: string;
  uploaderName: string;
  usedInCount: number;
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
  permissions: {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    canPublish: boolean;
    canManageAds: boolean;
    canManageEPaper: boolean;
    canManageUsers: boolean;
    canViewAnalytics: boolean;
    canChangeSettings: boolean;
  };
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

export interface UserPreferences {
  savedArticleIds: string[];
  favoriteCategories: string[];
  notificationsEnabled: boolean;
  notificationCategories: string[];
  preferredDistrict: string;
  fontSize: 'small' | 'medium' | 'large';
}
