import {gql, useQuery } from "@apollo/client"

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

export default function Home() {
  const {loading, error, data} = useQuery(GET_USERS)
  
  console.log(data);
  return (
    <main className="w-screen h-screen bg-gradient-to-br from-orange-300 to bg-lime-200">
      <section>
        My app
      </section>
    </main>
  )
}
