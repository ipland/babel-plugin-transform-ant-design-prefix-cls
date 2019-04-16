export default function ({ types: t }) {
  return {
    visitor: {

      ObjectExpression ({ node }, { opts : { prefixCls } }) {
        node.properties.forEach(
          property => {
            if (!prefixCls) { return }

            if (property.key && /^getPrefixCls/.test(property.key.name)) {

              t.isArrowFunctionExpression(property.value) &&
              property.value.body.body.forEach(
                node =>
                  t.isReturnStatement(node) && (
                    node.argument.quasis.forEach(
                      templateElement =>
                        templateElement.value.raw === 'ant-' && templateElement.value.cooked === 'ant-' &&
                        (
                          templateElement.value = { raw: `${prefixCls}-`, cooked: `${prefixCls}-` }
                        )
                    )
                  )
              )

              t.isFunctionExpression(property.value) &&
                property.value.body.body.forEach(
                  node =>
                    t.isReturnStatement(node) &&
                    t.isMemberExpression(node.argument.callee) &&
                    t.isStringLiteral(node.argument.callee.object) &&
                    (
                      Object.assign(node.argument.callee.object, t.stringLiteral(`${prefixCls}-`))
                    )
                )
            }

          }
        )
      },

      AssignmentExpression ({ container }, { opts : { prefixCls } }) {
        prefixCls &&
        container &&
        container.expression &&
        container.expression.left &&
        t.isMemberExpression(container.expression.left) &&
        container.expression.left.property.name === 'getPrefixCls' &&
        t.isFunctionExpression(container.expression.right) &&
        (
          container.expression.right.body.body.forEach(
            node =>
              t.isVariableDeclaration(node) &&
              node.declarations.forEach(
                declaration =>
                  declaration.id.name === 'prefixCls' &&
                  (
                    declaration.init = t.conditionalExpression(declaration.init.test, t.stringLiteral(prefixCls), declaration.init.alternate)
                  )
              )
          )
        )
      }

    }
  };
}
