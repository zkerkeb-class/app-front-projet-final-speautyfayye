if (!self.define) {
  let e,
    s = {};
  const c = (c, n) => (
    (c = new URL(c + '.js', n).href),
    s[c] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, t) => {
    const a = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[a]) return;
    let i = {};
    const o = (e) => c(e, a),
      r = { module: { uri: a }, exports: i, require: o };
    s[a] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (t(...e), i));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: '43d5f9bde514a58bac3acc96e1672b64' },
        { url: '/_next/static/chunks/181-00c5394d716d3dbd.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        { url: '/_next/static/chunks/214.5296bb96c7595e3f.js', revision: '5296bb96c7595e3f' },
        { url: '/_next/static/chunks/265-7b5afdcef1ae8019.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        { url: '/_next/static/chunks/293.bd5935bd2240cec0.js', revision: 'bd5935bd2240cec0' },
        { url: '/_next/static/chunks/33-89284a3cca9b1c79.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        { url: '/_next/static/chunks/464-9097fc2ec407ee15.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        {
          url: '/_next/static/chunks/4bd1b696-a519c630a71939b7.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        { url: '/_next/static/chunks/517-5390ab19f281486b.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        {
          url: '/_next/static/chunks/53c13509-b115c189533060bc.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        { url: '/_next/static/chunks/637.e5a1215c7f1dc3d2.js', revision: 'e5a1215c7f1dc3d2' },
        {
          url: '/_next/static/chunks/66ec4792-62c48c1b9c8b747c.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        { url: '/_next/static/chunks/685-4604a10bec919d96.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        { url: '/_next/static/chunks/862-2a690753e19653cd.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        {
          url: '/_next/static/chunks/9c4e2130-f012581fc2969da7.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/album/%5Bid%5D/page-e48d8c779db2982d.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/artist/%5Bid%5D/page-fef7c792b865f999.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/createPlaylist/page-7f720c6c9b8bfa66.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-7ad480655222dfdc.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-1c983f6e84cff114.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/playlist/%5Bid%5D/page-4996f1aa1f94016a.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/search/page-34eb8fe8cfbd868b.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-f9dac7dfbb377935.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/framework-0d635b52335dc518.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        { url: '/_next/static/chunks/main-3f7acd67602923e1.js', revision: 'tFnxlPcOc8ekxqNebBxbo' },
        {
          url: '/_next/static/chunks/main-app-51311ff9376d1cb1.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/pages/_app-d23763e3e6c904ff.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-05c1984ee7695f54.js',
          revision: 'tFnxlPcOc8ekxqNebBxbo',
        },
        { url: '/_next/static/css/e463daa116a2b3d4.css', revision: 'e463daa116a2b3d4' },
        {
          url: '/_next/static/media/4473ecc91f70f139-s.p.woff',
          revision: '78e6fc13ea317b55ab0bd6dc4849c110',
        },
        {
          url: '/_next/static/media/463dafcda517f24f-s.p.woff',
          revision: 'cbeb6d2d96eaa268b4b5beb0b46d9632',
        },
        {
          url: '/_next/static/tFnxlPcOc8ekxqNebBxbo/_buildManifest.js',
          revision: '02947297a8b730555ec4b54801527ac5',
        },
        {
          url: '/_next/static/tFnxlPcOc8ekxqNebBxbo/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
            cacheWillUpdate: async ({ request: e, response: s, event: c, state: n }) =>
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
