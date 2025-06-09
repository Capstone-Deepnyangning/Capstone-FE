module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets-core/plugin'],
    [
      'react-native-reanimated/plugin',
      {
        processNestedWorklets: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@zustand': './src/zustand',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
