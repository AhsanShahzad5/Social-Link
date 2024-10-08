import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client';
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = ()=>{
    return useContext(SocketContext);
}
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        //io('http://localhost:8000
        const socket = io('/', {
            query: {
                userId: user?._id
            }
        });
        setSocket(socket)
        socket.on("getOnlineUsers" , (users)=>{
			setOnlineUsers(users);
        })
        return () => socket && socket.close();
    }, [user?._id])
    
    // console.log(onlineUsers);
    return (
        <SocketContext.Provider value={{ socket , onlineUsers }} >
            {children}
        </SocketContext.Provider>
    )
}