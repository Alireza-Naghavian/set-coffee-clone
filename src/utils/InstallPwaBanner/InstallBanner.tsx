"use client";
import { MdInstallMobile } from "react-icons/md";
import "./installBanner.css";
import { useEffect, useState } from "react";
function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  const handleInstallClick = (e: any) => {
    e.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          setIsInstallable(false);
        }
        setDeferredPrompt(null);
      });
    }
  };
  useEffect(() => {
    const handleAppInstalled = () => {
      setIsInstallable(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  return (
    isInstallable && (
      <button
        onClick={(e) => {
          handleInstallClick(e);
        }}
        className={`bannerBtn  flex items-center  z-[999999999999999999]  `}
        title="نسخه وب اپ ست کافی"
      >
        <MdInstallMobile size={28} className="text-white" />
      </button>
    )
  );
}

export default InstallBanner;
