import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname,'./src/pages'),
      "@components": path.resolve(__dirname,'./src/components'),
      "@assets": path.resolve(__dirname,'./src/assets'),
      "@apis": path.resolve(__dirname,'./src/apis'),
      "@config": path.resolve(__dirname,'./src/config'),
      "@hooks": path.resolve(__dirname,'./src/hooks'),
      "@routers": path.resolve(__dirname,'./src/routers'),
      "@styles": path.resolve(__dirname,'./src/styles'),
      "@utils": path.resolve(__dirname,'./src/utils'),
      "@store": path.resolve(__dirname,'./src/store'),

    },
  },
  server: {
    port: 3000, 
    open: true,
  },
});
