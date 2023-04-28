import { useApolloClient } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { ADD_POST } from "@/lib/mutations/postMutations"
import { GET_POSTS } from "@/lib/queries/postQueries"
import { GET_USERS } from "@/lib/queries/userQueries"
import { User, Post } from "@/lib/types/types"
import React, { useState } from "react"

interface AddPostInput {
	title: string
	subtitle: string
	description: string
	userId: string
}

interface AddPostData {
	addPost: {
		id: string
		title: string
		subtitle: string
		description: string
		user: {
			id: string
			name: string
		}
	}
}
type SetIsPostModalVisible = React.Dispatch<React.SetStateAction<boolean>>

interface PostModalProps {
	isPostModalVisible?: boolean
	setIsPostModalVisible: SetIsPostModalVisible
}

const PostModal = ({
	isPostModalVisible = true,
	setIsPostModalVisible,
}: PostModalProps) => {
	const [addPostMutation] = useMutation<
		AddPostData,
		AddPostInput
	>(ADD_POST)

	const [title, setTitle] = useState("")
	const [subtitle, setSubtitle] = useState("")
	const [description, setDescription] = useState("")
	const [userId, setUserId] = useState("")
	const client = useApolloClient()
	if (!isPostModalVisible) return null
	const { users } = client.readQuery({ query: GET_USERS })

	const resetFields = () => {
		setTitle("")
		setSubtitle("")
		setDescription("")
		setUserId("")
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			await addPostMutation({
				variables: { title, subtitle, description, userId },
				refetchQueries: [{ query: GET_POSTS }],
			})
			setIsPostModalVisible(false)
			resetFields()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{isPostModalVisible && (
				<section className='absolute w-screen h-screen z-10 bg-slate-700 bg-opacity-60 grid place-items-center'>
					<form
						onSubmit={handleSubmit}
						className='h-3/5 w-1/3 bg-white flex flex-col items-center gap-6 py-4 rounded-md'
					>
						<h3 className='text-2xl underline'>Create a new post:</h3>
						<div className='flex flex-col w-2/3'>
							<label className='text-md font-medium'>Title:</label>
							<input
								type='text'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='border w-full p-2 bg-slate-100 focus:bg-slate-100 rounded-md'
							/>
						</div>
						<div className='flex flex-col w-2/3'>
							<label className='text-md font-medium'>Subtitle:</label>
							<input
								type='text'
								value={subtitle}
								onChange={(e) => setSubtitle(e.target.value)}
								className='border w-full p-2 bg-slate-100 focus:bg-slate-100 rounded-md'
							/>
						</div>
						<div className='flex flex-col w-2/3'>
							<label className='text-md font-medium'>Description:</label>
							<input
								type='text'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className='border w-full p-2 bg-slate-100 focus:bg-slate-100 rounded-md'
							/>
						</div>
						<div className='flex flex-col w-2/3'>
							<label className='text-md font-medium'>User:</label>
							<select
								className='border w-full p-2 bg-slate-100 focus:bg-slate-100 rounded-md'
								onChange={(e) => setUserId(e.target.value)}
							>
								<option value=''>Select your user</option>
								{users.map((user: User) => (
									<option key={user.id} value={user.id}>
										{user.name}
									</option>
								))}
							</select>
						</div>
						<button className="w-2/3 py-2 rounded-md text-white bg-indigo-600" type='submit'>Submit</button>
					</form>
				</section>
			)}
		</>
	)
}

export default PostModal
