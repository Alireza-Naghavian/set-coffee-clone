if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('Service Worker registered with scope: ', registration.scope);
    }).catch(error => {
      console.log('Service Worker registration failed:', error);
    });
  });
}
self.addEventListener("install",function(event){
    console.log("installing sw");
})
self.addEventListener('activate', event => {
    // event.waitUntil(
        
    // )
    console.log(event,"activating");
});
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: "/badge.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("notif clickd");
  event.notification.close();
  event.waitUntil(
    clients.openWidnow(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.NEXT_PUBLIC_API_URL
    )
  );
});
