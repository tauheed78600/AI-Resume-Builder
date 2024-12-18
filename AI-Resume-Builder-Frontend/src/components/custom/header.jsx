import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <Link to="/">
            <img src="/AIResLogo.png" width={270} height={100} alt="AIRes Logo" />
            </Link>
              {isSignedIn?
            <div className='flex gap-2 items-center'>
                <Link to = "/dashboard">
                    <Button variant="outline">DashBoard</Button>
                </Link>
                
                <UserButton />
            </div>:
            <Link to={'/auth/signin'}>
                <Button className='mt-4'>Get Started</Button>
            </Link>}
        </div>
    )
}

export default Header
