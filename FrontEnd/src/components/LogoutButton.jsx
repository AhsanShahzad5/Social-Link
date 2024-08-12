import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { Button } from '@chakra-ui/button'
import { FiLogOut } from "react-icons/fi";
import useShowToast from '../../hooks/useShowToast'
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({size}) => {
  const setUser = useSetRecoilState(userAtom);
  //calling showToast function from our hook
  const showToast = useShowToast()
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {

      //fetch req to remove
      const res = await fetch('/api/users/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //body: JSON.stringify(formData)

      });
      const data = await res.json();
      // console.log(data);

      if (data.error) {
        showToast("Error", data.error, 'error')
        return;
      }
      localStorage.removeItem('user-threads');
      setUser(null);
      navigate('/auth')
    } catch (error) {
      showToast("Error", error, 'error')
    }


  }
  return (
    <>
      <Button 
      // position={"fixed"} top={"30px"} right={"30px"} size={"sm"}
        onClick={handleLogout}
        background={'none'}
        >
        <FiLogOut size={size} />
      </Button>
    </>
  )
}

export default LogoutButton