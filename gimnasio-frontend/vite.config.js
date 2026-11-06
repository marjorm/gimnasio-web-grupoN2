import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// API de desarrollo: mismo origen para la web y el cookie de sesión JSESSIONID.
// En un despliegue real el servidor deberá redirigir /api al backend.
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: process.env.E6_PROXY_TARGET || 'http://127.0.0.1:8080',
                changeOrigin: true,
            },
        },
    },
});
