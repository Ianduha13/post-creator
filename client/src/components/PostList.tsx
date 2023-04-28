import { useQuery } from "@apollo/client"
import { GET_POSTS } from "@/lib/queries/postQueries"
import { Post } from "@/lib/types/types"
import PostModal from "./PostModal"
import { useState } from "react"
import DeletePostButton from "./DeletePostButton"

const PostList = () => {
	const { loading, error, data } = useQuery(GET_POSTS)
	const [isPostModalVisible, setIsPostModalVisible] = useState(false)
if (loading)
		return (
			<div className='w-1/2 grow grid grid-cols-3 gap-8 text-white'>
				<div className='bg-indigo-400 relative text-white h-80 rounded-md shadow-md p-4'>
					<h2 className='text-xl font-semibold my-4'>Loading</h2>
					<p className='text-white-600'></p>
					<p className='text-gray-200 my-2 h-24 overflow-hidden'></p>
					<p className='text-white truncate absolute bottom-0 mb-4'></p>
				</div>
			</div>
		)
	if (error) {
		throw new Error(error.message)
	}
	console.log(data.posts);
	return (
		<>
			<PostModal
				isPostModalVisible={isPostModalVisible}
				setIsPostModalVisible={setIsPostModalVisible}
			/>
			<button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:brightness-105" onClick={() => setIsPostModalVisible(true)}>Add a Post</button>
			<section className=' w-1/2 grow grid grid-cols-3 gap-8 my-8'>
				{data.posts.map((post: Post) => (
					<div
						key={post.id}
						className='bg-indigo-400 relative text-white h-80 rounded-md shadow-md p-4'
					>
						<DeletePostButton postId={post.id}/>
						<h2 className='text-xl font-semibold my-4'>{post.title}</h2>
						<p className='text-white-600'>{post.subtitle}</p>
						<p className='text-gray-200 my-2 h-24 overflow-hidden'>
							{post.description}
						</p>
						<p className='text-white truncate absolute bottom-0 mb-4'>
							{post.user.name}
						</p>
					</div>
				))}
			</section>
		</>
	)
}

export default PostList
