//our first custom hoook
import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";

const useShowToast = () => {
    const toast = useToast();
    
    const showToast = useCallback((title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 2000,
            isClosable: true,
            variant : 'subtle'
        });
    },[toast])

    return showToast;
}

export default useShowToast;