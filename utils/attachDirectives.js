const { forEachField } = require('graphql-tools')
const { getArgumentValues } = require('graphql/execution/values')

const directiveResolvers = require('../directives')

const attachDirectives = schema => {
  forEachField(schema, field => {
    const directives = field.astNode.directives
    directives.forEach(directive => {
      const directiveName = directive.name.value
      const resolver = directiveResolvers[directiveName]

      if (resolver) {
        const oldResolve = field.resolve
        const Directive = schema.getDirective(directiveName)
        const args = getArgumentValues(Directive, directive)

        field.resolve = function() {
          const [source, _, context, info] = arguments
          let promise = oldResolve.call(field, ...arguments)

          const isPrimitive = !(promise instanceof Promise)
          if (isPrimitive) {
            promise = Promise.resolve(promise)
          }

          return promise.then(result =>
            resolver(result, source, args, context, info)
          )
        }
      }
    })
  })
}

module.exports = attachDirectives
