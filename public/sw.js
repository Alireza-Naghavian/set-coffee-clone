if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then((registration) => {
        console.log(
          "Service Worker registered with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
// auto update sw
self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

//
self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log(data);
  const options = {
    ...data,
    icon: data.cover,
    badge: "/icons/android-chrome-192x192.png",
    vibrate: [100, 50, 100],
  };
  console.log(options);
  event.waitUntil(registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("notif clickd");
  console.log(event);
  const notification = event.notification;
  const action = event.action;

  event.waitUntil(clients.openWindow(notification.data.url));

  event.notification.close();
});
