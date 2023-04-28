import Header from "@/components/Header";
import UserList from "@/components/UserList";
import PostList from "@/components/PostList";
import PostModal from "@/components/PostModal";

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gradient-to-br from-indigo-700
     to bg-indigo-200 flex flex-col items-center">
        <Header/>
        <PostList/>
        <UserList/>
    </main>
  )
}
