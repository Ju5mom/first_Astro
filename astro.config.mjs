// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://warm-rabanadas-293b08.netlify.app/",
  integrations: [preact()]
});