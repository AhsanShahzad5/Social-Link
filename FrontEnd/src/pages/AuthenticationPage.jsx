import React from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import authenticationAtom from '../../atoms/authAtom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const AuthenticationPage = () => {
    // wokrs like useState first vlaye is set using this func and second using a difff one
    // const [first, setfirst] = useState(second)

  const authScreenState = useRecoilValue(authenticationAtom);
  // console.log(authScreenState);
//   useSetRecoilState(authenticationAtom)
  return (
    <>
   { authScreenState === 'login' ? <Login/> : <Signup/>}
    </>
  )
}

export default AuthenticationPage