import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
function Chats() {

const [chats,setChats]=useState([]);
const {currentUser}=useContext(AuthContext);
const {dispatch}=useContext(ChatContext);


useEffect(()=>{
  const getChats =()=>{


  const unsub = onSnapshot(doc(db, "userChats",currentUser.uid), (doc) => {
    setChats(doc.data())
  
      });
      return ()=>{
        unsub();
    };
  };
  currentUser.uid && getChats()
},[currentUser.uid]);

const handleSelect=(u)=>{
  dispatch({type:"CHANGE USER",payload:u})
}


  return (
    <div className='chats-container'>
    {Object.entries(chats)?.map((chat)=>
    <div className='user-chat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
    
      <img src={chat[1].userInfo.photoURL} alt='' className='chats-container-left'/>
      <div className='chats-container-right'>
      <span className='user'>{chat[1].userInfo.displayname}</span>
      <p className='user-chat'>{chat[1].userInfo.lastmessage?.text}</p>
      </div>
    </div>
   
  )}
  </div>
  );
};

export default Chats;
