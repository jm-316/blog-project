import PostList from "../../components/PostList/PostList";
import Profile from "../../components/Profile/Profile";

export default function ProfilePage() {
  return (
    <>
      <Profile />
      <PostList hasNavigation={false} defaultTab="my" />
    </>
  );
}
