import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': resolve(root, 'assets'),
      '@components': resolve(root, 'components'),
      '@pages': resolve(root, 'pages'),
      '@context': resolve(root, 'context'),
      '@utils': resolve(root, 'utils'),
      '@services': resolve(root, 'services'),
      '@stores': resolve(root, 'stores'),
    },
  },
  server: {
    // headers: {
    //   'Content-Security-Policy': `
    //     default-src 'self';
    //     connect-src 'self' https://*.mapbox.com;
    //     img-src 'self' data: blob: https://*.mapbox.com;
    //     script-src 'self' 'unsafe-eval' https://*.mapbox.com;
    //     style-src 'self' 'unsafe-inline' https://*.mapbox.com;
    //   `
    // }
  }
});
