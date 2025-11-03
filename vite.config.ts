import path from 'path'
import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const virtualRouterFileChangeReloadPlugin: PluginOption = {
  name: 'watch-config-restart',
  configureServer(server) {
    server.watcher.add("./src/routes.ts");
    server.watcher.on("change", (path) => {
      if (path.endsWith("src/routes.ts")) {
        console.log("Virtual route changed");
        server.restart();
      }
    });
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode })=>  {
  const env = loadEnv(mode, process.cwd());
  const allowedHosts = env.VITE_ALLOWED_HOSTS?.split(",") ?? [];

  return {
    server: {
      allowedHosts,
      host: true,
      port: 3000,
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:8080",
      //     changeOrigin: true,
      //     secure: false,
      //     ws: true
      //   }
      // }
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        virtualRouteConfig: "./src/routes.ts",
      }),
      react(),
      tailwindcss(),
      virtualRouterFileChangeReloadPlugin,
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
