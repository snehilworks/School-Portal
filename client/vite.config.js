import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  // Create an object to hold the define mappings
  const defineEnv = {};

  // Iterate over the environment variables and map them to process.env
  for (const key in env) {
    if (key.startsWith("VITE_")) {
      defineEnv[`process.env.${key.slice(5)}`] = JSON.stringify(env[key]);
    }
  }

  return {
    plugins: [react()],
    define: defineEnv,
  };
});
