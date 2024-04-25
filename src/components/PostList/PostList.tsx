import { Link } from "react-router-dom";
import styles from "./PostList.module.css";

export default function PostList() {
  return (
    <div className={styles.post__list}>
      {[...Array(10)].map((post, index) => (
        <div className={styles.post__box} key={index}>
          <div className={styles.post__box__header}>
            <Link to={`/posts/${index}`}>
              <div className={styles.post__profile__box}>
                <div className={styles.post__profile} />
                <div className={styles.post__author__email}>test@test.com</div>
                <div className={styles.post__date}>2024-04-24</div>
              </div>
            </Link>
            <div className={styles.post__utils__box}>
              <div className={styles.post__delete}>삭제</div>
              <div className={styles.post__edit}>수정</div>
            </div>
          </div>
          <Link to={`/posts/${index}`}>
            <div className={styles.post__title}>게시글 {index}</div>
            <div className={styles.post__text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
              culpa distinctio placeat minus veritatis, perspiciatis rerum eos
              saepe aut molestias quis voluptatem dicta quaerat autem blanditiis
              fuga pariatur quos laudantium! Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Eligendi culpa distinctio placeat
              minus veritatis, perspiciatis rerum eos saepe aut molestias quis
              voluptatem dicta quaerat autem blanditiis fuga pariatur quos
              laudantium! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Eligendi culpa distinctio placeat minus veritatis,
              perspiciatis rerum eos saepe aut molestias quis voluptatem dicta
              quaerat autem blanditiis fuga pariatur quos laudantium! Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Eligendi culpa
              distinctio placeat minus veritatis, perspiciatis rerum eos saepe
              aut molestias quis voluptatem dicta quaerat autem blanditiis fuga
              pariatur quos laudantium! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Eligendi culpa distinctio placeat minus
              veritatis, perspiciatis rerum eos saepe aut molestias quis
              voluptatem dicta quaerat autem blanditiis fuga pariatur quos
              laudantium! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Eligendi culpa distinctio placeat minus veritatis,
              perspiciatis rerum eos saepe aut molestias quis voluptatem dicta
              quaerat autem blanditiis fuga pariatur quos laudantium!
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
