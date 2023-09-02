import Image from "next/image"
import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 fixed top-0 z-10">
      <div className="flex-1">
        <Link href="/">
          <Image className="rounded" src="/images/logo.png" alt="logo" height={100} width={100} />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div>
          <Link className="btn btn-ghost" href="/posts">All posts</Link>
        </div>
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image alt="user" src="/images/hero.png" height={100} width={100} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><Link href="/posts">Posts</Link></li>
            <li><Link href="/posts">Logout</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar