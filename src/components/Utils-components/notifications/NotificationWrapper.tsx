"use client";
import usePushSubscription from "@/hooks/helper-hooks/usePushSubscription";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import UrlBaseArry from "./outputArray";
import { useAlert } from "@/app/context/AlertContext";

function NotificationWrapper({
  size = 30,
  label,
  onClick,
  className=""
}: {
  size?: number;
  label?: string;
  onClick?: any;
  className?:string
}) {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const { pushSub } = usePushSubscription();
  const { showAlert } = useAlert();
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);
  const getPermissionState = async () => {
    if (navigator.permissions) {
      let result = await navigator.permissions.query({ name: "notifications" });
      return result.state;
    }
  };
  async function getPushSubscription() {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  }
  // registraion sw
  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }
  // get permission for subscribe
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: UrlBaseArry(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    // send to bckend
    await pushSub(sub);
  }

  // dismissed permission
  async function unsubscribeFromPush() {
    setSubscription(null);
    return await subscription?.unsubscribe();
  }

  if (!isSupported) {
    return (
      <IoMdNotificationsOutline
        onClick={() =>
          showAlert("error", "مرورگر شما از این قابلیت پشتیبانی نمیکند")
        }
        title="فعال سازی اعلان ها"
        size={30}
        className={`${subscription && "hidden"} font-Shabnam_B cursor-pointer`}
      />
    );
  }
  return (
    <div
      className={`${subscription && "hidden"} flex items-center gap-x-2 ${className}`}
      onClick={() => subscribeToPush()}
    >
      <IoMdNotificationsOutline
        title="فعال سازی اعلان ها"
        size={size}
        className={`${subscription && "hidden"} font-Shabnam_B cursor-pointer`}
      />
      <span className="text-sm font-Shabnam_M text-dark_shade">{label}</span>
    </div>
  );
}

export default NotificationWrapper;
