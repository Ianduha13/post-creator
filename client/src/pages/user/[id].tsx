import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_USER } from '@/lib/queries/userQueries'
import Header  from '@/components/Header'

const UserPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id },
  })
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  const user = data.user
  return (

    <main className="w-screen min-h-screen bg-gradient-to-br flex flex-col items-center justify-center text-white from-indigo-700">
      <Header/>
      <div className='grow flex items-center justify-center flex-col'>
      <Link href='/' className='mb-2 py-1 px-4 bg-white text-indigo-600 rounded-full'> Go Back</Link>
      <h1>{user.name}</h1>
      <h3>{user.email}</h3>
</div>
    </main>
  )
}

export default UserPage