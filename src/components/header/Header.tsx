import { Link, useLocation } from "react-router-dom"
import { IoPerson } from "react-icons/io5"

import "./Header.scss"

const menuItems = [
  { path: "/", label: "Books" },
  { path: "/create-a-book", label: "Create a book" },
  { path: "/authors", label: "Authors" },
  { path: "/create-an-author", label: "Create an author" },
]

const Header = () => {
  const { pathname: currPath } = useLocation()

  return (
    <div className='header'>
      <div className='anouncement-bar'>
        <span>Welcome to our books management system.</span>
        <IoPerson className="person-icon"/>
      </div>
      <div className='navigation-bar'>
        <Link to='/' className='link'>
          <img src='/logo.png' alt='Image of orange spiral as our logo' />
        </Link>
        <div className='menu'>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`link ${currPath === item.path ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
