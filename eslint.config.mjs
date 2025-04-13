import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  ...compat.extends('plugin:react/jsx-runtime'),
  ...compat.extends('plugin:prettier/recommended'), // 💡 prettier rule 적용

  {
    rules: {
      'react/jsx-sort-props': 'error',
      // 필요 시 여기 추가
    },
  },
];

export default eslintConfig;
