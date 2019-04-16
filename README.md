# babel-plugin-transform-ant-design-prefix-cls

Transform ant-design component hardcoded prefixCls. So far, it just supports [Ant Design3.x](http://ant.design/docs/react/introduce-cn).

## Usage

```bash
npm install babel-plugin-transform-ant-design-prefix-cls --save-dev
```

Via `babel.config.js` or babel-loader.
```JavaScript
{
  "plugins": [["transform-ant-design-prefix-cls", { prefixCls: 'ant' }]]
}
```


Via `webpack.config.js`
```JavaScript
{
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules(?!\/antd\/(es|lib)\/config-provider)/,
      use: [ { loader: 'babel-loader' } ]
    }
  ]
}
```