'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "1c02a9db4369e93137b3950ee95a7a62",
"assets/AssetManifest.bin.json": "8c54ec05db70e4d5eca81c6eaf2c8f15",
"assets/AssetManifest.json": "c9ae3d89ae5a510c6b287f3b93e8be8f",
"assets/assets/icons/anagrafe.png": "ed28b5aff36e0495d9caffc87c89255d",
"assets/assets/icons/appio.png": "b156a37d7da518f1b358a873c1d243b6",
"assets/assets/icons/civix.png": "2c067cab885c8b3538b6d48d444b7ca7",
"assets/assets/icons/fakenews.png": "7ad135e68672d5e049e4eec5c7fb462d",
"assets/assets/icons/fse.png": "ea05beb811da5f0531f9aab7ae55a0ff",
"assets/assets/icons/pagopa.png": "c4dfe79c99fb692e25301604e4eb7f35",
"assets/assets/icons/passaporto.png": "f7f86430a21d2e2a2cb9895b829243d8",
"assets/assets/icons/privacy.png": "54d5d81e69be2209cd8d9d72f829be37",
"assets/assets/icons/scuola.png": "5b1be88b3881cfd89b17c86212b171af",
"assets/assets/icons/spazio.png": "d7281505a41c86ecc751a53a37db568a",
"assets/assets/icons/spid.png": "da2f42bb5b0b988e93a8fc3e271ccb41",
"assets/assets/images/center.png": "b49ded2b3c471d3ddb0504bc82e83a40",
"assets/assets/images/petals.png": "e67451308c5b408755dc0dfc19adefcd",
"assets/assets/logo/logo.png": "9a0a3acb21b9ea6d0a330ddbc2d011bc",
"assets/assets/videos/civix_intro.mp4": "a19577e6020bbe97f63e9902110b4622",
"assets/assets/videos/civix_intro_h264.mp4": "5dae582a821b1b495c007413dee918b9",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4f2f805412f3eb6df7135b4b8b40def1",
"assets/NOTICES": "db065073a6053a8cf0a547eeea1e87ec",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "d5dc78c4cf9ce73742fafa56f4b974f5",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "c41bd74412aa9f8c96df3648190b2398",
"icons/Icon-192.png": "54ed7fd2058af7f93a8c2abb471cd962",
"icons/Icon-512.png": "f438d58e53fae2c2c030b35ace5e226c",
"icons/Icon-maskable-192.png": "54ed7fd2058af7f93a8c2abb471cd962",
"icons/Icon-maskable-512.png": "f438d58e53fae2c2c030b35ace5e226c",
"index.html": "76069588b572e387b024d738a260d0e0",
"/": "76069588b572e387b024d738a260d0e0",
"main.dart.js": "a51a0f31a05bb46dc145f4fe033fec87",
"manifest.json": "35c78c37bc77ddfa3b031319086e2efc",
"splash/img/dark-1x.png": "b8bb62e9c8d2b4c755c7b6801adebaf0",
"splash/img/dark-2x.png": "f9491e0b1246c00463587872a5a74fc4",
"splash/img/dark-3x.png": "3f65b21865fe1889c035f5803c2f020c",
"splash/img/dark-4x.png": "9ab2cb6afeedd1ec4ab644d34c2d694e",
"splash/img/light-1x.png": "b8bb62e9c8d2b4c755c7b6801adebaf0",
"splash/img/light-2x.png": "f9491e0b1246c00463587872a5a74fc4",
"splash/img/light-3x.png": "3f65b21865fe1889c035f5803c2f020c",
"splash/img/light-4x.png": "9ab2cb6afeedd1ec4ab644d34c2d694e",
"version.json": "c217de3285cedfebe44559cf01e9850e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
