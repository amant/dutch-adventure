import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      exclude: [
        '**/app/app.vue',
        '**/app/data/**',
        '**/app/pages/index.vue',
      ],
    },
  },
});
