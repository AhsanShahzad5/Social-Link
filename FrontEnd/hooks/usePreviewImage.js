import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const showToast = useShowToast()
    const [imgUrl, setImgUrl] = useState(null)
  const handleImageChange = (e)=>{
        // gives meta data of the file . only the first file since it returns an array
        const file = e.target.files[0];
        if(file && file.type.startsWith("image/")){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImgUrl(reader.result);
            }
            //turns it into  base 64 string
            reader.readAsDataURL(file)
        }
        else {
            showToast("Invalid file type" , "Please select and image file " , "error" )
            setImgUrl(null);      
        }

    }
  
    return {handleImageChange , imgUrl , setImgUrl}
}

export default usePreviewImage