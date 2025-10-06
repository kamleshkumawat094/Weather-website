import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 server: {
    host: true, // allow network access
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "02b64ec030c3.ngrok-free.app" // yahan Ngrok ka URL daalo
    ]
  }
})
