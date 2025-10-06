import React from 'react'
import { AiFillHome, AiOutlineSearch, AiOutlineUser , AiOutlineLineChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";



const Navbar = () => {
  
  return (
    <div className=' z-50 bottom-2  w-full  fixed px-3 '>
        <div className="flex place-content-around bg-white  p-6 max-w-[450px] mx-auto rounded-3xl px-2">
 <NavLink 
 to="/"
  className={({ isActive }) => isActive ? "text-blue-500" : "text-black"}
 >
    <AiFillHome size={30}/>
 </NavLink>
  <NavLink 
  to="/search" 
  className={({ isActive }) => isActive ? "text-blue-600" : "text-pblack"}
>
  <AiOutlineSearch size={30}/>
</NavLink>
<NavLink 
  to="/forecast" 
  className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}
>
  
  <AiOutlineLineChart size={30}/>
</NavLink>
<NavLink 
  to="/setting" 
  className={({ isActive }) => isActive ? "text-blue-500" : "text-black"}
>
<AiOutlineUser  size={30}/>
</NavLink>

  
        </div>
    </div>
  )
}

export default Navbar