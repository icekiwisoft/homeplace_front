import Logo from '@assets/Whited.svg';
import { signinDialogActions } from '@stores/defineStore';
import { AuthData } from '@utils/types';
import usePulsy from 'pulsy';
import React, { useState } from 'react';
import { GoX } from 'react-icons/go';
import { HiBars3 } from 'react-icons/hi2';
import { Link, NavLink } from 'react-router-dom';
import Burger from '@assets/img/SVG/Burger.svg';
// import Logo from '@assets/domilix.png';
// import logo from '../../../assets/img/logo.png';

export default function Nav(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className='absolute top-0 left-0 w-full z-30'>
        <div className='w-full px-4 sm:px-6 md:px-9'>
          <nav className='flex capitalize items-center justify-between h-20'>
            <div className='flex items-center'>
              <NavLink className='text-2xl font-bold flex' to='/'>
                <img src={Logo} alt='logo' className='h-5' />
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className='flex gap-6 md:gap-28 '>
              <ul className='flex gap-4 md:gap-9 '>
                <NavLink to={'/#'}>
                  <li className='capitalize font-bold text-white font-lg'>
                    Login
                  </li>
                </NavLink>
                <NavLink to={'/#'}>
                  <li className='capitalize font-bold text-white font-lg'>
                    Sign Up
                  </li>
                </NavLink>
              </ul>
              
              {/* Custom Hamburger Menu Button - Must be above overlay */}
              <button 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="relative z-[1000] w-8 h-8 flex flex-col justify-center items-center"
              >
                <div className="w-8 h-8 flex flex-col justify-center items-center">
                  <span 
                    className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
                    }`}
                  ></span>
                  <span 
                    className={`block w-6 h-0.5 bg-white rounded-full my-1.5 transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0 transform scale-x-0' : ''
                    }`}
                  ></span>
                  <span 
                    className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Full-screen Menu Overlay with Animation - z-index below the button */}
      <div 
        className={`fixed inset-0 bg-[#EA7D00]/90 z-[10] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible scale-100' 
            : 'opacity-0 invisible scale-95'
        }`}
      >
        <div className="flex flex-col items-center space-y-8 capitalize">
          {['Home', 'About', 'houses', 'Contact'].map((item, index) => (
            <NavLink 
              key={index}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={({ isActive }) => `
                text-white text-3xl font-medium 
                hover:text-[#0D2E4F] transition-all duration-300
                transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                transition-all duration-300 delay-${index * 100}
              `}
              onClick={handleLinkClick}
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
