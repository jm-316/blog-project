import { User } from "firebase/auth";

export const CATEGORIES: CategoryType[] = [
  "자유게시판",
  "Frontend",
  "Backend",
  "web",
];

export type CategoryType = "자유게시판" | "Frontend" | "Backend" | "web";

export type TabType = "all" | "my";

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string | null;
  createdAt: string;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
}

export interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
  activeTab?: TabType | CategoryType;
  handleChangeActiveTab?: (tab: CategoryType | TabType) => void;
}

export interface CommentsProps {
  post: PostProps;
  setPost: React.Dispatch<React.SetStateAction<PostProps | null>>;
}

export interface CommentListProps {
  post: PostProps;
  user: User | null;
  handleDeleteComment: (data: CommentsInterface) => void;
}
