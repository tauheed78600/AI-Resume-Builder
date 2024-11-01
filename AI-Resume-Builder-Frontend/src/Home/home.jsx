import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import Header from '../components/custom/header'

function Home() {
  return (
    <div>
      <Header/>
      <UserButton/>
    </div>
  )
}

export default Home
