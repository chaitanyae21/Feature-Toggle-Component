import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React. It includes the React plugin to enable JSX support.
export default defineConfig({
  plugins: [react()],
});
