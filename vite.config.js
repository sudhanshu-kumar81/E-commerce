import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Ensure this matches 'dist' in vercel.json
  }
})

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()], // Use @vitejs/plugin-react for React support

//   build: {
//     outDir: 'dist', // Output directory for production build
//     assetsDir: '', // Directory for static assets relative to outDir
//     sourcemap: true, // Enable source maps
//     minify: 'terser', // Minify production build using terser
//   },

//   define: {
//     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//     'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://api.example.com'),
//     // Define any other environment variables here
//   },

//   server: {
//     port: 3000, // Default development server port
//     open: true, // Open the default browser on server start
//   },
// });
