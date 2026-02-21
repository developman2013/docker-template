module.exports = {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['dist/**', 'coverage/**', 'node_modules/**'],
  rules: {
    'selector-class-pattern': '^[a-z][a-z0-9\\-_]*$'
  }
};
