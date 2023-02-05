import React, { useState,useContext } from 'react'
import Attach from '../image/attach.png'
import Img from '../image/img.png'
import {  ref,  getDownloadURL,uploadBytesResumable } from "firebase/storage";
import { doc } from "firebase/firestore";
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import { arrayUnion, Timestamp,serverTimestamp, updateDoc } from 'firebase/firestore';
import {db,storage} from "../../firebase";
import {v4 as uuid} from "uuid";

function Input() {
const[text,setText]=useState("");
// const navigate = useNavigate();

const[img,setImg]=useState(null);
// const [err,setErr]=useState(false);

  const {currentUser}=useContext(AuthContext);
  const {data}=useContext(ChatContext);
  const handleSend=async()=>{
    if(img){
      const storageRef =ref(storage,uuid());
      const uploadTask=uploadBytesResumable(storageRef,img);

      uploadTask.on(
        (error)=> {
        },
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }

  return (
    
    <div className="chat-end">
      <input type="text"
        placeholder="Type something..." className='send-input' onChange={e=>setText(e.target.value)}
        value={text}
        />
      <div className="send">
        <img src={Attach} alt="" className='img'/>
        <input type="file" style={{ display: "none" }} id="file" onChange={e=>setImg(e.target.img[0])}/>
        <label htmlFor="file">
          <img src={Img} alt="" className='img' />
        </label>
        <button className='send-button' onClick={handleSend} >Send</button>
      </div>
    </div>
    
  );
};

export default Input;
