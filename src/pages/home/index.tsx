import { useState } from "react";
import PostList from "../../components/PostList/PostList";
import styles from "./Home.module.css";

interface PostListProps {
  defaultTab?: TabType | CategoryType;
}

type TabType = "all" | "my";

type CategoryType = "Frontend" | "Backend" | "web" | "Native";

const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "web", "Native"];

export default function Home({ defaultTab = "all" }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );

  return (
    <>
      <div className={styles.post__navigation}>
        <div
          onClick={() => setActiveTab("all")}
          className={
            activeTab === "all" ? styles.post__navigation__active : ""
          }>
          전체보기
        </div>
        <div
          onClick={() => setActiveTab("my")}
          className={activeTab === "my" ? styles.post__navigation__active : ""}>
          나의 글
        </div>
        {CATEGORIES.map((category) => (
          <div
            key={category}
            onClick={() => setActiveTab(category)}
            className={
              activeTab === category ? styles.post__navigation__active : ""
            }>
            {category}
          </div>
        ))}
      </div>
      <PostList />
    </>
  );
}
