import { CATEGORIES, PostListProps } from "../../typings/post.types";
import styles from "./Category.module.css";

export default function Category({
  activeTab,
  handleChangeActiveTab,
}: PostListProps) {
  return (
    <div className={styles.post__navigation}>
      <div
        onClick={() => handleChangeActiveTab && handleChangeActiveTab("all")}
        className={activeTab === "all" ? styles.post__navigation__active : ""}>
        전체보기
      </div>
      <div
        onClick={() => handleChangeActiveTab && handleChangeActiveTab("my")}
        className={activeTab === "my" ? styles.post__navigation__active : ""}>
        나의 글
      </div>
      {CATEGORIES.map((category) => (
        <div
          key={category}
          onClick={() =>
            handleChangeActiveTab && handleChangeActiveTab(category)
          }
          className={
            activeTab === category ? styles.post__navigation__active : ""
          }>
          {category}
        </div>
      ))}
    </div>
  );
}
