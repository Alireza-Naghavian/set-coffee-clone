"use client"
import useMediaQuery from '@/hooks/helper-hooks/useMediaQuery'
import React from 'react'
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

function NavBarContent() {
    const chageNavBar = useMediaQuery("(max-width:1024px)");
  return (
    <>{
        chageNavBar ? <MobileMenu/> : <DesktopMenu/>
    }</>
  )
}

export default NavBarContent