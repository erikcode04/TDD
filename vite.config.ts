import { defineConfig } from "vite";
//ändrage lite i denna fil för att kunna köra tester i både backend och frontend
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
