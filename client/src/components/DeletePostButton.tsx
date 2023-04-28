import { FaTrash } from 'react-icons/fa';
import { DELETE_POST } from '@/lib/mutations/postMutations';
import { GET_POSTS } from '@/lib/queries/postQueries';
import { useMutation } from '@apollo/client';

export default function DeletePostButton({ postId }: { postId: string }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: postId },
    refetchQueries: [{ query: GET_POSTS }],
  });

  return (
    <div className='flex mt-5 w-full justify-end absolute -top-2 right-4'>
      <button className= 'm-2 p-1 bg-red-600 rounded-md cursor-pointer' onClick={() => deletePost()}>
        <FaTrash className='icon' />
      </button>
    </div>
  );
}