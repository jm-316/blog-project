export interface PostListProps {
  defaultTab?: TabType | CategoryType;
}

export type TabType = "all" | "my";

export type CategoryType = "자유게시판" | "Frontend" | "Backend" | "web";
