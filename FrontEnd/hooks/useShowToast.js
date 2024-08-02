//our first custom hoook
import { useToast } from "@chakra-ui/toast";

const useShowToast = () => {
    const toast = useToast();
    
    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 2000,
            isClosable: true,
        });
    }

    return showToast;
}

export default useShowToast;