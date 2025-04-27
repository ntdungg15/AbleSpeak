module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // ✅ Đúng preset cho Expo
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
          },
        },
        'module:react-native-dotenv',
      ],
    ],
  };
};
