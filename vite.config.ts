import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": resolve(root, "assets"),
      "@components": resolve(root, "components"),
      "@pages": resolve(root, "pages"),
      "@context": resolve(root, "context"),
      "@utils": resolve(root, "utils"),
    },
  },
});
