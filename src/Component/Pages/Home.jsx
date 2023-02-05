import React from 'react';
import Sidebar from '../Home/Sidebar';
import Chat  from '../Home/Chat';
import "./Home.css";
function Home() {
  return (
    <div className='home'>
      <div className='container'>
      <Sidebar />
      <Chat />
      </div>
      
    </div>
  )
}

export default Home
