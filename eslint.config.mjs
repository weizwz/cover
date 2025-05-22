import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@next/next/no-img-element': 'off', // 关闭image告警
      '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量告警
      // [
      //   'warn',
      //   {
      //     varsIgnorePattern: '^(pattern|size)$',
      //   }
      // ],
      'no-unused-vars': 'off',
      // "react-hooks/exhaustive-deps": 'off'  关闭useEffect依赖监听告警
    }
  }
]

export default eslintConfig
