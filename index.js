'use strict';

function main (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      ObjectExpression: function ObjectExpression(_ref2, _ref3) {
        var node = _ref2.node;
        var prefixCls = _ref3.opts.prefixCls;
        node.properties.forEach(function (property) {
          if (!prefixCls) {
            return;
          }

          if (property.key && /^getPrefixCls/.test(property.key.name)) {
            t.isArrowFunctionExpression(property.value) && property.value.body.body.forEach(function (node) {
              return t.isReturnStatement(node) && node.argument.quasis.forEach(function (templateElement) {
                return templateElement.value.raw === 'ant-' && templateElement.value.cooked === 'ant-' && (templateElement.value = {
                  raw: "".concat(prefixCls, "-"),
                  cooked: "".concat(prefixCls, "-")
                });
              });
            });
            t.isFunctionExpression(property.value) && property.value.body.body.forEach(function (node) {
              return t.isReturnStatement(node) && t.isMemberExpression(node.argument.callee) && t.isStringLiteral(node.argument.callee.object) && Object.assign(node.argument.callee.object, t.stringLiteral("".concat(prefixCls, "-")));
            });
          }
        });
      },
      AssignmentExpression: function AssignmentExpression(_ref4, _ref5) {
        var container = _ref4.container;
        var prefixCls = _ref5.opts.prefixCls;
        prefixCls && container && container.expression && container.expression.left && t.isMemberExpression(container.expression.left) && container.expression.left.property.name === 'getPrefixCls' && t.isFunctionExpression(container.expression.right) && container.expression.right.body.body.forEach(function (node) {
          return t.isVariableDeclaration(node) && node.declarations.forEach(function (declaration) {
            return declaration.id.name === 'prefixCls' && (declaration.init = t.conditionalExpression(declaration.init.test, t.stringLiteral(prefixCls), declaration.init.alternate));
          });
        });
      }
    }
  };
}

module.exports = main;
