const MY_CACHE = ['/projects/', 
'/project', '/',
 '/offline.html',
 ]



self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function() {
  console.log('Installing web app');
  return caches.open('offline').then(function(cache) {
    console.log('caching index and important routes');
    return cache.addAll(MY_CACHE);
  });
};

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//       caches.match(event.request)
//       .then(function(response) {
//           if(response){
//               return response
//           }
//           // not in cache, return from network
//           return fetch(event.request, {credentials: 'include'});
//       })
//   );
// });



self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          if(response){
              return response
          }
          else{
             
              var reqCopy = event.request.clone();
              
              return fetch(reqCopy, {credentials: 'include'}) 
              .then(function(response) {
               
                  if(!response || response.status !== 200 || response.type !== 'basic') {
                      return response; 
                  }

              
                  var resCopy = response.clone();


                  caches.open(cacheName)
                  .then(function(cache) {
                      return cache.put(reqCopy, resCopy); 
                  });

             


                  return response; 
              })
          }
      })
  );
    })