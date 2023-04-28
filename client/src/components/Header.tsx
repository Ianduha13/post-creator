import Link from "next/link"

const Header  =() => {
    return (
        <nav className="h-20 flex w-screen justify-between items-center max-w-7xl">
            <h1 className="text-2xl font-medium text-white ">Post Creator</h1>
            <div className="flex gap-2">
              <Link href='/' className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:brightness-105">
               Go to Home Page
              </Link>
             
            </div>
        </nav>
    )
}
export default Header