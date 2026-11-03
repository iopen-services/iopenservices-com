import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    // Use strictly '.test.ts' here if you don't want '.spec.ts':
    include: ['tests/int/**/*.int.test.ts', 'src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/.git/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
