import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3000,
    //removing the cors error
    //also while doing fetch request we dont need to write all this and written in target , instead we can just write "/api" here
    proxy : {
      "/api" : {
        target : "http://localhost:8000",
        changeOrigin : true ,
        secure : false,
      }
    } ,
    build: {
      outDir: 'dist',
    }
  }
})
