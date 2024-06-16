"use client"
import useMediaQuery from '@/hooks/helper-hooks/useMediaQuery'
import React from 'react'
import MobildMenu from './MobildMenu';
import DesktopMenu from './DesktopMenu';

function NavBarContent() {
    const chageNavBar = useMediaQuery("(max-width:1024px)");
  return (
    <>{
        chageNavBar ? <MobildMenu/> : <DesktopMenu/>
    }</>
  )
}

export default NavBarContent