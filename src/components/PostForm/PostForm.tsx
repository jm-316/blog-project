import { CATEGORIES } from "../Category/Category.types";

export default function PostForm() {
  return (
    <form>
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" required />
      </div>
      <div>
        <label htmlFor="category">카테고리</label>
        <select>
          {CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" required />
      </div>
      <button>제출</button>
    </form>
  );
}
