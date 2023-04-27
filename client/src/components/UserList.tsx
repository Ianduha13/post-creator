import { GET_USERS, GET_USER } from "@/lib/queries/userQueries";
import { useQuery } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { User } from "@/lib/types/types";
import Link from "next/link";

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if(loading) return <p>Loading...</p>
  if (error) {
    throw new Error(error.message);
  }
	return (
    <>
		<table className="w-1/2 mb-8 text-white bg-indigo-500">
    <thead>
      <tr className="border border-white h-8">
        <th className="" >Username</th>
        <th className="">E-mail</th>
        <th className="">Link to profile</th>
      </tr>
    </thead>
    <tbody className="w-full">
      {data.users.map((user: User) => (
        <tr key={user.id} className="border border-white border-t-0 h-8">
          <td className="text-center">{user.name}</td>
          <td className="text-center">{user.email}</td>
          <td className="text-center">
            <Link href={`/user/${user.id}`} className="text-center">
              <button className="py-1 px-3 text-xs border rounded-full">
                <FaUser/>
              </button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</>
	)
}

export default UserList
