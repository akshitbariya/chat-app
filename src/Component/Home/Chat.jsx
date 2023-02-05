import React,{useContext} from 'react'
import vcall from '../image/videocall.png';
import call from '../image/calljpeg.jpg';
import dot from '../image/threedotjpeg.jpg';
import Input from './Input';
import Messages from './Messages';
import { ChatContext } from '../../context/ChatContext';
const Chat = () => {
const {data}=useContext(ChatContext);

  return (
    <div  className='chat-container'>
      <div className='chat-top'>
      <span className='chat-top-left'>{data.user.displayName}</span>
      <div className='chat-top-right'>
      <img src={vcall} alt='' className='vcall-icon'/>
      <img src={call} alt='' className='call-icon'/>
      <img src={dot} alt='' className='dot-icon'/> 
      </div>
      </div>
        <Messages/>
        
        <Input/>
      
    </div>
  );
}

export default Chat

