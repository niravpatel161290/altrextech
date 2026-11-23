import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // Split heavy third-party libraries into their own long-lived chunks
        // so they cache independently of app code and stay under the size limit.
        codeSplitting: {
          groups: [
            { name: "vendor-react", test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|react-helmet-async)[\\/]/, priority: 30 },
            { name: "vendor-charts", test: /node_modules[\\/](recharts|d3-[^\\/]+|victory-vendor|@reduxjs|redux|immer|reselect|decimal\.js-light|es-toolkit)[\\/]/, priority: 20 },
            { name: "vendor-flow", test: /node_modules[\\/]@xyflow[\\/]/, priority: 15 },
            { name: "vendor-motion", test: /node_modules[\\/](framer-motion|motion|motion-dom|motion-utils)[\\/]/, priority: 20 },
            { name: "vendor-gsap", test: /node_modules[\\/](gsap|lenis)[\\/]/, priority: 20 },
          ],
        },
      },
    },
  },
})
