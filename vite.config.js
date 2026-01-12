import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
<<<<<<< HEAD

export default defineConfig({
  plugins: [react()],
=======
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
>>>>>>> a2e78ce28173195a78fb092cf2a8ef925e69470e
});
