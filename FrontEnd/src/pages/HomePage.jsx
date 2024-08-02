import React from 'react'
import LogoutButton from '../components/LogoutButton'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'

const HomePage = () => {
  const user = useRecoilValue(userAtom)
  return (


    <>
      <h1>My Profile</h1>
      {user && <LogoutButton/>}
    </>
  )
}

export default HomePage