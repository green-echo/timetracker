var cacheName = 'cache';
var filesToCache = [
  './CHANGELOG.md',
  './package-lock.json',
  './package.json',
  './webpack.config.js',
  './client/index.js',
  './client/socket.js',
  './client/utils.js',
  './client/app.js',
  './client/history.js',
  './client/routes.js',
  './client/actions/action-types.js',
  './client/actions/d3data.js',
  './client/actions/project.js',
  './client/actions/ticket.js',

  './client/components/AddUserToProject.js',
  './client/components/DroppableContainer.js',
  './client/components/auth-form.js',
  './client/components/NotFound.js',
  './client/components/board-top.js',
  './client/components/Projects.js',
  './client/components/index.js',
  './client/components/Bars.js',
  './client/components/ResponsiveWrapper.js',
  './client/components/navbar.js',
  './client/components/Chart.js',
  './client/components/Ticket.js',
  './client/components/project-board.js',
  './client/components/Column.js',
  './client/components/TimeSheet.js',
  './client/components/user-home.js',
  './client/components/CreateProject.js',
  './client/components/Timer.js',
  './client/components/CreateTicket.js',
  './client/components/UpdateTicket.js',
  './client/components/userTimeTable.js',

  './client/store/d3data.js',
  './client/store/project.js',
  './client/store/user.js',
  './client/store/index.js',
  './client/store/ticket.js',
  './public/404-error-page-examples.jpeg',
  './public/bundle.js',
  './public/manifest.json',
  './public/bundle.js.map',
  './public/offline.html',
  './public/favicon.ico	',
  './public/style.css',

  './public/timey-icon.png',
  './public/index.html',
  './public/timeylogo.jpeg',

  './server/index.js',
  './server/api/index.js',
  './server/api/tickets.js',
  './server/api/users.js',
  './server/api/projects.js',
  './server/api/userTickets.js',
  './server/auth/google.js',
  './server/auth/index.js',

  './server/db/db.js',
  './server/db/index.js'
];

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function(cache) {
//       console.info('[sw.js] cached all files');
//       return cache.addAll(filesToCache);
//     })
//   );
// });

self.addEventListener("install", function(event) {
  event.waitUntil(preLoad());
});

var preLoad = function(){
  console.log("Installing web app");
  return caches.open(cacheName).then(function(cache) {
    console.log("caching index and important routes");
    return cache.addAll(filesToCache);
  });
};

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cName) {
//           if (cName !== cacheName) {
//             return caches.delete(cName);
//           }
//         })
//       );  
//     })
//   );
// });

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

// self.addEventListener('fetch', function(e) {
//   e.respondWith(
//     caches.match(e.request).then(function(r) {
//           console.log('[Service Worker] Fetching resource: '+e.request.url);
//       return r || fetch(e.request).then(function(response) {
//                 return caches.open(cacheName).then(function(cache) {
//           console.log('[Service Worker] Caching new resource: '+e.request.url);
//           cache.put(e.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });


// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
     
//       if (response) {
//         return response;
//       } else {
//         // clone request stream
//         // as stream once consumed, can not be used again
//         var reqCopy = event.request.clone();

//         return fetch(reqCopy, { credentials: 'include' }) // reqCopy stream consumed
//           .then(function(response) {
//             // bad response
//             // response.type !== 'basic' means third party origin request
//             if (
//               !response ||
//               response.status !== 200 ||
//               response.type !== 'basic'
//             ) {
//               return response; // response stream consumed
//             }

//             // clone response stream
//             // as stream once consumed, can not be used again
//             var resCopy = response.clone();

//             // add response to cache and return response
//             caches.open(cacheName).then(function(cache) {
//               return cache.put(reqCopy, resCopy); // reqCopy, resCopy streams consumed
//             });

//             // ====================================================== //

//             return response; // response stream consumed
//           });
//         }}))})


// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });


// /////////!1!!!!!!!!!!
// self.addEventListener("fetch", function(event) {
//   event.respondWith(checkResponse(event.request).catch(function() {
//     return returnFromCache(event.request);
//   }));
//   event.waitUntil(addToCache(event.request));
// });

// var checkResponse = function(request){
//   return new Promise(function(fulfill, reject) {
//     fetch(request).then(function(response){
//       if(response.status !== 404) {
//         fulfill(response);
//       } else {
//         reject();
//       }
//     }, reject);
//   });
// };

// var addToCache = function(request){
//   return caches.open(cacheName).then(function (cache) {
//     return fetch(request).then(function (response) {
//       console.log(response.url + " was cached");
//       return cache.put(request, response);
//     });
//   });
// };

// var returnFromCache = function(request){
//   return caches.open(cacheName).then(function (cache) {
//     return cache.match(request).then(function (matching) {
//      if(!matching || matching.status == 404) {
//        return cache.match(filesToCache);
//      } else {
//        return matching;
//      }
//     });
//   });
// };

// addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;     // if valid response is found in cache return it
//         } else {
//           return fetch(event.request)     //fetch from internet
//             .then(function(res) {
//               return caches.open(cache)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());    //save the response for future
//                   return res;   // return the fetched data
//                 })
//             })
//             .catch(function(err) {       // fallback mechanism
//               return caches.open(cacheName)
//                 .then(function(cache) {
//                   return cache.match(filesToCache);
//                 });
//             });
//         }
//       })
//   );
// });      


