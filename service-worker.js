"use strict";var precacheConfig=[["/index.html","5f8436719c5dc2b48a479dbe5b54e84f"],["/static/css/main.1d4a4068.css","67134f8a955007f4e2752ba8b1699660"],["/static/js/main.86d8d515.js","b36adb0f25e64cc96b62faf7678ad11c"],["/static/media/CV.e49f7e2e.pdf","e49f7e2e57bc22321857d4d6c45c3b9a"],["/static/media/about.410701dd.jpg","410701dd3190aa7f73babbe998be4d50"],["/static/media/airquality.f7bbff26.png","f7bbff2614daa91498a93c8f055a894c"],["/static/media/angular.481ac5da.png","481ac5da79aad45ef013103c76e147e4"],["/static/media/avatar.988f2476.jpg","988f2476b78d6613b3c7aae3823c7206"],["/static/media/bg.9c9f6365.jpg","9c9f63651c36f4c467e83b4ad438e445"],["/static/media/cakephp.7369b711.png","7369b711d687b1da897ce64e0474e918"],["/static/media/csharp.d292c7db.png","d292c7db4dd4001117b3c48594524a59"],["/static/media/css.ca94107a.png","ca94107ae2b3d1cdc66d8ee64c81135b"],["/static/media/d3.e0ea4016.png","e0ea40166bfe7da1c20af8dbc5a6d0ca"],["/static/media/dotnetcore.624d846d.png","624d846db7fed9bd7b165e633dec5423"],["/static/media/dotnetframework.3ff62710.png","3ff627104bd9ec87ee9aff07428ef914"],["/static/media/flask.c16ff672.png","c16ff672e18f651e52cf33e7e41d26fd"],["/static/media/git.f11d895b.png","f11d895bbd7b54a4f1e9c1cbb108ca6f"],["/static/media/google-cloud.c26243e0.png","c26243e06713575392e73582a08e25b0"],["/static/media/honey.4bdb2279.png","4bdb2279f8a8538e867f8045b0bcf001"],["/static/media/html.7f6e3643.png","7f6e364320e2f2bffdcb25cc6f7a76f9"],["/static/media/iwd.1a6d1c80.png","1a6d1c803b4af73fe22e3dcf30297727"],["/static/media/javascript.aa3031cf.png","aa3031cfeaca5327f055231e64da4870"],["/static/media/logo.06f3b733.png","06f3b7334691d8c6b43c243db8b207d5"],["/static/media/math.9a38f642.png","9a38f642a80dfb30a0237ec2513bf766"],["/static/media/mendeleev.b79bed20.png","b79bed20fadc3fb3756b9705d5f7cd8d"],["/static/media/mongodb.457241e9.png","457241e9e0dd5983da7890b1fb528e98"],["/static/media/mssql.8272ae62.png","8272ae627987e6c6918a89041512bbfa"],["/static/media/mysql.75e4cb4d.png","75e4cb4d3861e703740e3b64e7e44eb1"],["/static/media/pap.7dca31ed.png","7dca31ed00c6f7788a2e191a5dcde995"],["/static/media/php.2ea4d038.png","2ea4d0382dff346d7da3573ee47892c8"],["/static/media/python.0e91d010.png","0e91d010778e2fcaffcda6b016428a35"],["/static/media/qc.6206e430.png","6206e4307f1d551ea9cfe81dce49f6de"],["/static/media/quotes.f4872759.png","f4872759054f177282f290b4022313d9"],["/static/media/react.66657f5d.png","66657f5dc34703daceb62cb80cf2f7d4"],["/static/media/redux.684c6918.png","684c6918971092d91b495ea5d00b76f3"],["/static/media/semantic-ui.9f4b1190.png","9f4b11905a0efa37bdf1e433ddfadb7c"],["/static/media/taxlab.28c360f3.png","28c360f32dc373993c947b97d47383ad"],["/static/media/weather.35273cc8.png","35273cc8d21f1d4a9ca565f651da8edf"],["/static/media/wikipedia.9768f241.png","9768f24189be3e357ac21f99fa039e6d"],["/static/media/world.b1a424e1.png","b1a424e196502e7dc65849021a8ba18c"],["/static/media/wrn.c1f5c912.png","c1f5c91262caf78ef27dabb318b0c0c1"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});