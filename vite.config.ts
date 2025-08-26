import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Change output directory from default 'dist' to 'build'
    outDir: 'dist',
    // Increase chunk size warning limit to 1000 kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React in a separate, stable chunk
          'react-vendor': ['react', 'react-dom'],
          // UI library chunk - only include packages that actually exist in your project
          'ui-lib': [
            '@radix-ui/react-label', 
            '@radix-ui/react-select',
            '@radix-ui/react-popover',
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-slot'
          ],
          // Form handling
          'form-lib': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          // Date utilities
          'date-lib': [
            'date-fns',
            'react-day-picker'
          ],
          // Icons and utilities
          'utils-lib': [
            'lucide-react',
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ]
        }
      },
    },
    // Enable source maps for production debugging (optional)
    sourcemap: mode === 'development',
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-hook-form',
        '@hookform/resolvers/zod',
        'zod',
        'date-fns',
        'lucide-react',
      ],
    },
    // Use esbuild for minification (default and faster than terser)
    minify: 'esbuild',
    // Additional esbuild optimization
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  },
}));
