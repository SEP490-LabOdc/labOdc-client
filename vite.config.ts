import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const allowedHosts = env.VITE_ALLOWED_HOSTS?.split(",") ?? [];
  const version = (
    env.INFISICAL_PLATFORM_VERSION ||
    env.VITE_LABODC_SYSTEM_VERSION ||
    "0.0.1"
  ).replaceAll(".", "-");

  return {
    server: {
      allowedHosts,
      host: true,
      port: 5173
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:8080",
      //     changeOrigin: true,
      //     secure: false,
      //     ws: true
      //   }
      // }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${version}-[hash].js`,
          chunkFileNames: `assets/[name]-${version}-[hash].js`,
          assetFileNames: `assets/[name]-${version}-[hash].[ext]`
        }
      }
    },
    plugins: [
      tsconfigPaths(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      visualizer({
        open: true, // Tự động mở báo cáo
        filename: 'dist/stats.html',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      global: 'window',
    },
  }
})
