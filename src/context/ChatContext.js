
import { useEffect } from "react";
import { createContext, useContext ,useReducer} from "react";

import { AuthContext } from "./AuthContext";

export const ChatContext =createContext();


export const ChatContextProvider =({chidren})=>{
    useEffect(()=>{
        console.log("chat called  ");
    },[])
    const {currentUser}=useContext(AuthContext);
    const INITIAL_STATE={
        chatId:"null",
        user:{},
    };

    const chatReducer=(state,action)=>{
        console.log(state,action);
        switch(action.type){
            case "CHANGE USER":
                return{
                    user:action.payload,
                    chatId:currentUser.uid>action.payload.uid ? 
                    currentUser.uid + action.payload.uid:
                    action.payload.uid +currentUser.uid,
                };
                default:
                    return state;
        }
    };

    const [state,dispatch]=useReducer(chatReducer, INITIAL_STATE);
    useEffect(()=>{
        console.log("state changed  ",state);
    },[state])
    return(
    <ChatContext.Provider value ={{data:state,dispatch}}>
        {console.log("user")}
    
        {chidren}
    </ChatContext.Provider>

    );
    
};