import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  let input;
  let output;
  if (mode === "backend") {
    input = "server.ts";
    output = "backend";
  } else if (mode === "frontend") {
    output = "frontend";
  }
  return {
    test: {
      include: ["./tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: ["./tests/e2e/**", "**/node_modules/**"],
    },
    build: {
      rollupOptions: {
        input: input,
        output: {
          dir: `dist/${output}`,
        },
      },
    },
  };
});
