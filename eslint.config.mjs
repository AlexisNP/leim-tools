import withNuxt from './.nuxt/eslint.config.mjs'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default withNuxt({
  plugins: {
    '@stylistic/js': stylisticJs
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'space-in-parens': 'off',
    'computed-property-spacing': 'off',
    '@stylistic/js/indent': [ 'warn', 2, { SwitchCase: 1 } ],
  }
})