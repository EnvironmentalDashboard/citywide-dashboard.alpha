export default {
    input: "src/index.js",
    output: {
      name: "cwd",
      format: "umd",
      file: "dist/cwd-bundle.js",
      extend: true,
      indent: false,
      banner: "// @author Jeremy Feinstein",
    }
  };