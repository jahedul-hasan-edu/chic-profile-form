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
    // Increase chunk size warning limit to 1000 kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and React DOM
          vendor: ['react', 'react-dom'],
          // UI components chunk
          ui: [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-button',
            '@radix-ui/react-calendar',
            '@radix-ui/react-card',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-form',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-input',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-sheet',
            '@radix-ui/react-skeleton',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-table',
            '@radix-ui/react-tabs',
            '@radix-ui/react-textarea',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
          // Form handling chunk
          forms: [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],
          // Date utilities chunk
          date: [
            'date-fns',
            'react-day-picker',
          ],
          // Icons chunk
          icons: ['lucide-react'],
          // Charts chunk (if you're using recharts)
          charts: ['recharts'],
          // Utilities chunk
          utils: [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
        },
      },
    },
    // Enable source maps for production debugging (optional)
    sourcemap: mode === 'development',
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-hook-form',
        '@hookform/resolvers/zod',
        'zod',
        'date-fns',
        'lucide-react',
      ],
    },
  },
}));
