import Logo from '@assets/Whited.svg';
import { signinDialogActions } from '@stores/defineStore';
import { AuthData } from '@utils/types';
import usePulsy from 'pulsy';
import React, { useEffect, useRef, useState } from 'react';
import { GoX } from 'react-icons/go';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutUser } from '@services/userApi';

export default function Nav(): React.ReactElement {
  const [authData] = usePulsy<AuthData>('authData');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Handle clicks outside of profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        profileButtonRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Profile Menu Component
  function ProfilePopup() {
    return (
      <div
        ref={profileMenuRef}
        className='fixed right-2 mt-4 min-w-80 bg-white border rounded-lg shadow-lg p-4 z-[60]'
        onMouseDown={e => e.stopPropagation()}
      >
        <div className='flex justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center'>
              {authData.user?.name
                ? authData.user.name.charAt(0).toUpperCase()
                : 'U'}
            </div>
            <div>
              <p className='text-sm font-semibold'>
                {authData.user?.name || 'Utilisateur'}
              </p>
              <p className='text-sm text-gray-600'>{authData.user?.email}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowProfileMenu(false)}
            aria-label="Close menu"
          >
            <GoX className='text-2xl font-bold' />
          </button>
        </div>

        <div className='space-y-2 border-t pt-2'>
          {Number(authData.user?.is_admin) === 1 && (
            <div
              onClick={() => {
                navigate('/dashboard');
                setShowProfileMenu(false);
              }}
              className='block py-2 hover:bg-gray-100 rounded cursor-pointer'
            >
              Dashboard
            </div>
          )}
          <div
            onClick={() => {
              navigate('/favorite');
              setShowProfileMenu(false);
            }}
            className='block py-2 hover:bg-gray-100 rounded cursor-pointer'
          >
            Mes Favoris
          </div>
          <div
            onClick={() => {
              navigate('/subscriptions');
              setShowProfileMenu(false);
            }}
            className='block py-2 hover:bg-gray-100 rounded cursor-pointer'
          >
            Mes Abonnements
          </div>
          <button
            onClick={() => {
              logoutUser();
              setShowProfileMenu(false);
            }}
            className='w-full text-left py-2 text-red-500 hover:bg-red-50 rounded'
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

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
            <div className='flex gap-6 md:gap-28'>
              {authData?.status === 'logged' ? (
                <div className='flex items-center gap-4'>
                  <button
                    ref={profileButtonRef}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className='w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700'
                  >
                    {authData.user?.name
                      ? authData.user.name.split(' ').map(word => word[0]).join('').toUpperCase()
                      : 'U'}
                  </button>
                  {showProfileMenu && <ProfilePopup />}
                </div>
              ) : (
                <ul className='flex gap-4 md:gap-9'>
                  <button onClick={() => signinDialogActions.toggle()}>
                    <li className='capitalize font-bold text-white font-lg'>
                      Login
                    </li>
                  </button>
                  <button onClick={() => signinDialogActions.toggle()}>
                    <li className='capitalize font-bold text-white font-lg'>
                      Sign Up
                    </li>
                  </button>
                </ul>
              )}
              
              {/* Hamburger Menu Button */}
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

      {/* Menu Overlay */}
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
