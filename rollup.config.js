import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

export default {
  external: ["axios"],
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      exports: "default",
      format: "cjs",
    },
    {
      file: pkg.module,
      exports: "default",
      format: "es",
    },
  ],
  plugins: [resolve(), typescript({ tsconfig: "./tsconfig.json" })],
};
