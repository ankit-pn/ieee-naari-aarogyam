import React from "react";
import Tracker from "./custom/Tracker/Tracker";

import Navbar2 from "./Navbar2";
export default function Home() {
  
  const Token = (localStorage.getItem('ID'))
  
  if(!Token){
    window.location.replace('/login')
  }

  return (
    <div>
      <Navbar2 />
      {Token ?   <Tracker/> : 'NOT LOGGED IN'} 
    </div>
  );
}
