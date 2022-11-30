import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false // set this option to redirect to different URL's such as github for O
});
