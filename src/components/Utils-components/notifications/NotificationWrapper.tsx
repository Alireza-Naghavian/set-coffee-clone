"use client"
import React, { useEffect, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import UrlBaseArry from './outputArray';
import { useAlert } from '@/app/context/AlertContext';

function NotificationWrapper() {
    const [isSupported,setIsSupported] = useState(false);
    const [subscription, setSubscription]  = useState<PushSubscription|null>(null);
    const [message,setMessage] = useState("");
    const {showAlert} = useAlert();
    useEffect(()=>{
        if("serviceWorker" in navigator && "PushManager" in window){
            setIsSupported(true);
            registerServiceWorker();
        }
    },[])

    // registraion sw
    async function registerServiceWorker(){
        const registration = await navigator.serviceWorker.register("/sw.js",{
            updateViaCache:"none"
        })
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

        // get permission for subscribe
    async function subscribeToPush(){
        const registration = await navigator.serviceWorker.ready
        const sub= await registration.pushManager.subscribe({
            userVisibleOnly:true,
            applicationServerKey:UrlBaseArry(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
        })
        setSubscription(sub);
        // subscribe user and save to server
        // await subscribeUser(sub);
    }

    // dismissed permission
    async function unsubscribeFromPush(){
        await subscription?.unsubscribe();
        setSubscription(null);
        // unsubscribe in server
        // await unsubscribeUser();
    }

    async function sendTestNotif(){
        if(subscription){
            // notif body from server
            // await sendNotification(message)
            setMessage("")
            showAlert("success","ارسال اعلان تایید شد")
        }
    }
  
    if (!isSupported) {
        return <p>مرورگر شما از ارسال اعلان پشتیبانی نمیکند</p>
      }
  return (
    <IoMdNotificationsOutline onClick={()=>subscribeToPush} title='فعال سازی اعلان ها'  size={30} className="font-Shabnam_B cursor-pointer" />
  )
}

export default NotificationWrapper