import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      'index': 'src/index.ts',
      'MultiFingerTap': 'src/MultiFingerTap.ts',
      'useMultiFingerTap': 'src/useMultiFingerTap.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    target: 'es2018',
    external: ['react'],
    splitting: false,
    outExtension({ format }) {
      return {
        js: format === 'cjs' ? '.js' : '.mjs',
      };
    },
  },
]);
