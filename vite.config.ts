import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT, 10) : 3000,
    },
  };
});
// This configuration sets up Vite with React and Tailwind CSS, defines path aliases for easier imports, and configures the server port based on environment variables. It also ensures compatibility with the latest React features and optimizes the build process.
