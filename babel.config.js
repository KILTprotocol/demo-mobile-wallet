module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // The following plugin will rewrite imports. Reimplementations of node
    // libraries such as `assert`, `buffer`, etc. will be picked up
    // automatically by the React Native packager.  All other built-in node
    // libraries get rewritten to their browserify counterpart.
    [
      require('babel-plugin-rewrite-require'),
      {
        aliases: {
          Buffer: 'buffer',
          console: 'console-browserify',
          constants: 'constants-browserify',
          crypto: 'react-native-crypto',
          // crypto: 'crypto-browserify',
          dgram: 'react-native-udp',
          dns: 'dns.js',
          domain: 'domain-browser',
          fs: 'react-native-level-fs',
          http: '@tradle/react-native-http',
          // http: 'stream-http',
          https: 'https-browserify',
          net: 'react-native-tcp',
          os: 'react-native-os',
          // os: 'os-browserify/browser',
          path: 'path-browserify',
          querystring: 'querystring-es3',
          stream: 'stream-browserify',
          _stream_duplex: 'readable-stream/duplex',
          _stream_passthrough: 'readable-stream/passthrough',
          _stream_readable: 'readable-stream/readable',
          _stream_transform: 'readable-stream/transform',
          _stream_writable: 'readable-stream/writable',
          // sys: 'util',
          timers: 'timers-browserify',
          tls: false,
          tty: 'tty-browserify',
          Textencoder: 'fast-text-encoding',
          // util: 'util',
          vm: 'vm-browserify',
          zlib: 'browserify-zlib',

          // You can add your own, much like webpack aliases:
          // 'corporate-lib': 'corporate-lib-react-native',

          // You can also mock any libraries that you don't need to support on
          // React Native, but have to be present for 3rd party code to work:
          // 'some-third-party-dependency': 'node-libs-browser/mock/empty',
        },
        throwForNonStringLiteral: true,
      },
    ],
  ],
};
