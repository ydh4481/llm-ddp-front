module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  extends: [
    'next/core-web-vitals', // Next.js 기본 설정
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Prettier와 통합 (마지막에 위치)
  ],
  rules: {
    'prettier/prettier': 'error', // Prettier 오류는 ESLint 오류로 처리
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/react-in-jsx-scope': 'off', // Next.js에선 필요 없음
    'react/jsx-key': 'warn',
  },
};
