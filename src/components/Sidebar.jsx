import { useState } from "react";
import { NavLink } from "react-router-dom";
import {RiCloseLine} from "react-icons/ri"

import {logo} from "../assets";
import { links } from "../assets/constants"
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ( {handleClick} ) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex items-center justify-start my-8 text-sm font-medium text-gray-400 flex- row hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
        >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  
  const [mobileMenuOpen, setmobileMenuOpen] = useState(false);

  return (
    <>
    <div className="flex-col hidden md:flex w-[240px]
        py-10 px-4 bg-[#191624]
      ">
        <img src={logo} alt="logo" className="object-contain w-full h-14" />
        <NavLinks/>
      </div>
      
      {/* Mobile menu */}
    
    <div className="absolute block right-3 md:hidden top-6">
      {mobileMenuOpen ? (
        <RiCloseLine className="w-6 h-6 mr-2 text-white" 
        onClick={() => setmobileMenuOpen(false)} />
      ) : 
        <HiOutlineMenu className="w-6 h-6 mr-2 text-white" 
        onClick={() => setmobileMenuOpen(true)} /> }
    </div>
    <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] 
    backdrop-blur-lg z-10 p-6 md:hidden smooth-transition 
    ${mobileMenuOpen ? 'left=0' : '-left-full' }
    
    `}>
        <img src={logo} alt="logo" className="object-contain w-full h-14" />
        <NavLinks handleClick={ () => setmobileMenuOpen(false)}/>
    </div>
    
    </>
  )

};

export default Sidebar;
