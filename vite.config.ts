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
        manualChunks: (id) => {
          // Vendor chunk for React and React DOM
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            
            // Radix UI components - split into smaller chunks
            if (id.includes('@radix-ui')) {
              if (id.includes('react-form') || id.includes('react-label') || id.includes('react-select')) {
                return 'radix-forms';
              }
              if (id.includes('react-dialog') || id.includes('react-popover') || id.includes('react-tooltip')) {
                return 'radix-overlays';
              }
              if (id.includes('react-button') || id.includes('react-card') || id.includes('react-input')) {
                return 'radix-ui-basic';
              }
              return 'radix-ui-misc';
            }
            
            // Form handling libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'forms';
            }
            
            // Date utilities
            if (id.includes('date-fns') || id.includes('react-day-picker')) {
              return 'date-utils';
            }
            
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            
            // Charts (if using recharts)
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'charts';
            }
            
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'utils';
            }
            
            // Toast/notification libraries
            if (id.includes('sonner') || id.includes('react-toast')) {
              return 'notifications';
            }
            
            // Animation libraries
            if (id.includes('framer-motion') || id.includes('react-spring')) {
              return 'animations';
            }
            
            // All other node_modules
            return 'vendor-misc';
          }
          
          // App code chunks
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/hooks/')) {
            return 'hooks';
          }
          if (id.includes('/src/lib/')) {
            return 'lib';
          }
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
    // Additional optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
}));
