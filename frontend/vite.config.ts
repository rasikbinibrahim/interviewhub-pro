import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
    // The default 'forks' pool spawns a fresh Node OS process per test
    // file — on this environment's slow disk (WSL /mnt/c), that
    // spawn+module-resolution occasionally exceeds the pool's worker
    // startup timeout, and Vitest silently drops that file's tests
    // from the run instead of failing loudly. 'threads' reuses the
    // already-running process via worker_threads instead of forking a
    // new one from disk, which avoids the slow path entirely.
    pool: 'threads',
    fileParallelism: false,
  },
});
