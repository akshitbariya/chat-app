import React, {useContext, useState } from 'react';
import { collection, query, where,getDocs, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import {db} from "../../firebase"
import { doc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';

function Search() {
const [username,setUsername]=useState("null")
const [user,setUser]=useState("false")
const[err,setErr]=useState(false);
const {currentUser} = useContext(AuthContext);

const handleSearch=async()=>{
  const q= query(collection(db,"users"),where("displayName","==", username));

  try{
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    setUser(doc.data())

});}
catch(err){
  setErr(true);
}
};

const handleKey = e=>{
  e.code ==="Enter" && handleSearch();
};

const handleSelect=async()=>
{
  //cheak
  const combinedId=currentUser.uid>user.uid ? currentUser.uid + user.uid:user.uid +currentUser.uid;
try{
const res = await getDoc(doc(db,"chats",combinedId ));
  //create user chat
  if(!res.exists()){
    await setDoc(doc(db,"chats",combinedId),{ messages :[]});
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [combinedId+"userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL:user.photoURL
      },
      [combinedId+".date"]:serverTimestamp()
    });
    await updateDoc(doc(db,"userChats",user.uid),{
      [combinedId+"userInfo"]:{
        uid:currentUser.uid,
        displayName:currentUser.displayName,
        photoURL:currentUser.photoURL
      },
      [combinedId+".date"]:serverTimestamp()
    });
  }
  
}catch(err){}
  
setUser(null);
setUsername("")
};

  return (
    <div>
      <div className='search'>
        <div className='searchFrom'>
          <input type="text" placeholder='find a user' onKeyDown={handleKey} 
          onChange={e=>setUsername(e.target.value)}
            value={username}
          />

        </div>
        {err && <span>User not found !!</span>}
        {user && <div className='userChat'onClick={handleSelect}>
          <img src={user.photoURL} alt=''/>
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>}
      </div>
    </div>
  )
};

export default Search
