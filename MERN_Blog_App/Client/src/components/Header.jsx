import { Avatar, Button, Dropdown, DropdownHeader, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice.js'
import { signOutSuccess } from '../redux/user/userSlice.js'

const Header = () => {
    const {currentUser} = useSelector(state => state.user)
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const {theme} = useSelector(state => state.theme)
    const handleSignOut = async()=> {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST'
            })
            const data = await res.json()
            if(!res.ok) {
                console.log(data.message)
            }
            else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400'>TANVIR's</span>
            Blog
        </Link>
        <form>
            <TextInput
                type='Text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill >
            <AiOutlineSearch className='self-center'></AiOutlineSearch>
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button onClick={()=> dispatch(toggleTheme())} className='w-12 h-10 hidden sm:inline' color='gray' pill>
                {
                    theme === 'light' ?
                    <FaSun></FaSun> :
                    <FaMoon></FaMoon>
                }
                
            </Button>
            {currentUser ?
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt='user' img={currentUser.profilePicture} rounded />
                    }
                >
                    <DropdownHeader>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard?tab=profile'}> 
                        <Dropdown.Item>profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider></Dropdown.Divider>
                    <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Dropdown>
                : 
                <Link to='/sign-in'>
                    <Button outline gradientDuoTone='purpleToBlue'>
                        Sign In
                    </Button>
                </Link>
            }
            
            <Navbar.Toggle></Navbar.Toggle>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header