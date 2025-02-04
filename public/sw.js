if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, a) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[t]) return;
    let c = {};
    const o = (e) => i(e, t),
      r = { module: { uri: t }, exports: c, require: o };
    s[t] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (a(...e), c));
  };
}
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/app-build-manifest.json', revision: 'b81b84a097a2ff5c62070dc3abd5dbe0' },
        {
          url: '/_next/static/QYD3CiRBToh7WexwBS_8B/_buildManifest.js',
          revision: '02947297a8b730555ec4b54801527ac5',
        },
        {
          url: '/_next/static/QYD3CiRBToh7WexwBS_8B/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/181-00c5394d716d3dbd.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        { url: '/_next/static/chunks/214.2f713e3bc211457c.js', revision: '2f713e3bc211457c' },
        { url: '/_next/static/chunks/293.ee46db7a3262f815.js', revision: 'ee46db7a3262f815' },
        { url: '/_next/static/chunks/386-8f717245dc1d8608.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        {
          url: '/_next/static/chunks/4bd1b696-a519c630a71939b7.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        { url: '/_next/static/chunks/517-5390ab19f281486b.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        {
          url: '/_next/static/chunks/53c13509-b115c189533060bc.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        { url: '/_next/static/chunks/637.19762a08f5145859.js', revision: '19762a08f5145859' },
        {
          url: '/_next/static/chunks/66ec4792-62c48c1b9c8b747c.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        { url: '/_next/static/chunks/685-4604a10bec919d96.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        { url: '/_next/static/chunks/697-1ce028140ac5255d.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        { url: '/_next/static/chunks/718-3005b123b3908bce.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        { url: '/_next/static/chunks/744-2d76fb038f2ddf49.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        {
          url: '/_next/static/chunks/9c4e2130-f012581fc2969da7.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/album/%5Bid%5D/page-f4d3c10a20b9bbe6.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/artist/%5Bid%5D/page-5cc4d4e0e9067f99.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/category/%5Bid%5D/page-4dc5ad7196d24ee8.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/createPlaylist/page-380f6f260d5e1faf.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-3f5dfe6796c2c5f0.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/page-f13667e3cd6cfb50.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/playlist/%5Bid%5D/page-e28d816dedcdc826.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/search/page-d6d7e96507d34810.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-f9dac7dfbb377935.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/framework-0d635b52335dc518.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        { url: '/_next/static/chunks/main-3f7acd67602923e1.js', revision: 'QYD3CiRBToh7WexwBS_8B' },
        {
          url: '/_next/static/chunks/main-app-db1dbbc4c11505c8.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/pages/_app-d23763e3e6c904ff.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-d28b103e6230497e.js',
          revision: 'QYD3CiRBToh7WexwBS_8B',
        },
        { url: '/_next/static/css/fd731698373a8500.css', revision: 'fd731698373a8500' },
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
            cacheWillUpdate: async ({ request: e, response: s, event: i, state: n }) =>
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
