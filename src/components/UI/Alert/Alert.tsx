"use client"
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Image from 'next/image'
type AlertType ={
    status :string
    title:string
    startShow:boolean
}
function Alert({status,title,startShow}:AlertType) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  if (!mounted) return null;
    let IconSrc ;
    switch (status){
        case 'error':
            IconSrc = '/icons/error.svg'
            break
          case 'success':
            IconSrc = '/icons/success.svg'
            break
          case 'exclamation':
            IconSrc = '/icons/exclamation.svg'
            break
          case 'question':
            IconSrc = '/icons/question.svg'
            break
          default:
            IconSrc = '/icons/nothing.svg'
            break
    }
  return createPortal(
    <div
    className={`${
      startShow ? 'visible opacity-100' : 'invisible opacity-0 !z-[9999] '
    } fixed inset-0 z-[9999999] transition-all  duration-500`}
  >
    <div className="h-screen  w-screen bg-gray-700/20"   />
    <div
      className={`${
        startShow ? 'top-20' : '-top-full !z-[99999]'
      } fixed inset-x-0  z-50 mx-auto max-w-md transition-all duration-700`}
    >
      <div className="mx-2 h-fit rounded-md bg-white p-3 text-center shadow">
        <Image className="mx-auto" src={IconSrc} width="80" height="80" alt={status} />
        <p className="mt-2">{title}</p>
      </div>
    </div>
  </div>,
  document.body
  )
}

export default Alert