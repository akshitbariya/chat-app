import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect ,useState} from "react";
import {auth } from "../firebase";

export const AuthContext =createContext();

export const AuthContextProvider =({chidren})=>{
    const [currentUser,setCurrentUser]=useState({});
    const unsub = onAuthStateChanged(auth,(user)=>{
        console.log(user);

        setCurrentUser(user);
    });

    useEffect(()=>{
        
        // return ()=>{
            unsub();

        // };
    },[]);
    return(
    <AuthContext.Provider value ={{currentUser}}>
        
        {console.log("running context")}

        
        {chidren}
    </AuthContext.Provider>

    );
    
};