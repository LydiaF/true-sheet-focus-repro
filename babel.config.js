module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@mgcrea/react-native-tailwind/babel",
      // other plugins...
      "react-native-reanimated/plugin", // must be last (if present)
    ],
  };
};



