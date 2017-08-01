module.exports = ({ server } = {}) => ({
  presets: [
    [ 'env', {
      targets: server ? {node: 'current' } : { browsers: ['> 5%', 'last 2 versions' ] },
      modules: false,
      development: {
        plugins: [
          'babel-plugin-transform-react-jsx-self',
          'babel-plugin-transform-react-jsx-source'
        ]
      }
    } ],
    'react'
  ]
})
