module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Types allowed in commit messages
    'type-enum': [
      2,
      'always',
      [
        'feat',     // A new feature
        'fix',      // A bug fix
        'docs',     // Documentation only
        'style',    // Formatting, white-space — no code change
        'refactor', // Code change that is not a bug fix or feature
        'perf',     // Performance improvements
        'test',     // Adding or fixing tests
        'chore',    // Tooling, build process, auxiliary tools
        'ci',       // CI configuration
        'revert',   // Reverts a previous commit
        'build',    // Build system or dependency changes
      ],
    ],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
};
