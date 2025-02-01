if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, c) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => n(e, i),
      o = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(a.map((e) => o[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '436e05a410e0ff6dd40a3e6f61210f8e' },
        {
          url: '/_next/static/NyH0RHB-L9jP21x9XTR5_/_buildManifest.js',
          revision: '02947297a8b730555ec4b54801527ac5',
        },
        {
          url: '/_next/static/NyH0RHB-L9jP21x9XTR5_/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/214.fcb951e7edcca282.js', revision: 'fcb951e7edcca282' },
        { url: '/_next/static/chunks/293.bea7f21cc45597c2.js', revision: 'bea7f21cc45597c2' },
        {
          url: '/_next/static/chunks/4bd1b696-e0b91af8841fde7b.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        { url: '/_next/static/chunks/517-5a53496ce0327b2d.js', revision: 'NyH0RHB-L9jP21x9XTR5_' },
        {
          url: '/_next/static/chunks/53c13509-b115c189533060bc.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/66ec4792-62c48c1b9c8b747c.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        { url: '/_next/static/chunks/685-d8617b431a2c3496.js', revision: 'NyH0RHB-L9jP21x9XTR5_' },
        { url: '/_next/static/chunks/807-480c8eb521bb64cf.js', revision: 'NyH0RHB-L9jP21x9XTR5_' },
        { url: '/_next/static/chunks/862-29918a0b3c7b859d.js', revision: 'NyH0RHB-L9jP21x9XTR5_' },
        {
          url: '/_next/static/chunks/9c4e2130-f012581fc2969da7.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/album/%5Bid%5D/page-a06eb8d0a5aa040d.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/artist/%5Bid%5D/page-7d32e6e58672cc53.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/createPlaylist/page-8ec5c1c1ab19b52f.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-84b203594583b1c4.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-ddcccfea0c6a1e9a.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/playlist/%5Bid%5D/page-5c8ec0ce88543b86.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-cdb9694e4b37dc04.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/framework-0d635b52335dc518.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        { url: '/_next/static/chunks/main-3f7acd67602923e1.js', revision: 'NyH0RHB-L9jP21x9XTR5_' },
        {
          url: '/_next/static/chunks/main-app-51311ff9376d1cb1.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/pages/_app-d23763e3e6c904ff.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-af92cf068d0f85d4.js',
          revision: 'NyH0RHB-L9jP21x9XTR5_',
        },
        { url: '/_next/static/css/0281aa7859ef8e7f.css', revision: '0281aa7859ef8e7f' },
        {
          url: '/_next/static/media/4473ecc91f70f139-s.p.woff',
          revision: '78e6fc13ea317b55ab0bd6dc4849c110',
        },
        {
          url: '/_next/static/media/463dafcda517f24f-s.p.woff',
          revision: 'cbeb6d2d96eaa268b4b5beb0b46d9632',
        },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icons/icon-192x192.png', revision: '01edd415271393d521f510bfdd13e120' },
        { url: '/icons/icon-512x512.png', revision: 'd1206ed6d38b8d46657c2bb7bdacfaf0' },
        { url: '/logo.png', revision: '892949c55468d7fa637ced674bb9b31a' },
        { url: '/manifest.json', revision: '9334e4e07270472c13d9e570b894cdca' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: n, state: a }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    );
});
