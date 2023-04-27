import { useQuery, useMutation } from "@apollo/client"
import { ADD_POST } from "@/lib/mutations/postMutations"
import { GET_POSTS } from "@/lib/queries/postQueries"
import { Post } from "@/lib/types/types"
import Link from "next/link"
import { useState } from "react"

const PostList = () => {
	const { loading, error, data } = useQuery(GET_POSTS)
	const [title, setTitle] = useState('')
	const [subtitle, setSubtitle] = useState('')
	const [description, setDescription] = useState('')
	const [userId, setUserId] = useState('')

	const [addPost] = useMutation(ADD_POST, {  variables: { title, subtitle, description, userId },
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...posts, addPost] },
      });
    },
  });
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
	console.log(data.posts)
	console.log(data)
	return (
		<>
			<section className=' w-1/2 grow grid grid-cols-3 gap-8'>
				{data.posts.map((post: Post) => (
					<Link
						href={`/post/${post.id}`}
						key={post.id}
						className='bg-indigo-400 relative text-white h-80 rounded-md shadow-md p-4'
					>
						<h2 className='text-xl font-semibold my-4'>{post.title}</h2>
						<p className='text-white-600'>{post.subtitle}</p>
						<p className='text-gray-200 my-2 h-24 overflow-hidden'>
							{post.description}
						</p>
						<p className='text-white truncate absolute bottom-0 mb-4'>
							{post.user.name}
						</p>
					</Link>
				))}
			</section>
		</>
	)
}

export default PostList
