export const CATEGORIES: CategoryType[] = [
  "자유게시판",
  "Frontend",
  "Backend",
  "web",
];

export type CategoryType = "자유게시판" | "Frontend" | "Backend" | "web";

export type TabType = "all" | "my";

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
}

export interface PostListProps {
  defaultTab?: TabType | CategoryType;
  activeTab?: TabType | CategoryType;
  handleChangeActiveTab?: (tab: CategoryType | TabType) => void;
}
