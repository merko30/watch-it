module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'transform-inline-environment-variables',
      {
        include: [
          'NODE_ENV',
          'REACT_APP_GOOGLE_BOOKS_API_KEY',
          'REACT_APP_SERVER_API_URL',
        ],
      },
    ],
  ],
};
