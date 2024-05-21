export type IReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};
