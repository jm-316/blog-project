import { useState } from "react";
import { CategoryType, PostListProps, TabType } from "./Category.types";
import styles from "./Category.module.css";

const CATEGORIES: CategoryType[] = ["자유게시판", "Frontend", "Backend", "web"];

export default function Category({ defaultTab = "all" }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  return (
    <div className={styles.post__navigation}>
      <div
        onClick={() => setActiveTab("all")}
        className={activeTab === "all" ? styles.post__navigation__active : ""}>
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
  );
}
