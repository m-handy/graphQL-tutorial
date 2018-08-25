const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

// schema implementation - resolvers have to be named same as fields in schema.graphql
const resolvers = {
    Query: {
        info: () => `This is API of Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
        //link: (root, args) => links[args.id]
    },
    Mutation: {
        post: (root, args, context, info) => {
          return context.db.mutation.createLink({
            data: {
              url: args.url,
              description: args.description,
            },
          }, info)
        },
        /*
        updateLink: (root, args) => {
            if (args.id < idCount){
                const link = {
                    id: `link-${args.id}`,
                    description: args.description,
                    url: args.url,
                }
                links[args.id] = link
                return link
            }
            return null
        },
        deleteLink: (root, args) => {
            if (args.id < idCount){
                links.splice(args.id,1)
            }
            return links
        }
        */
    },
    // not needed - GraphQL server infers what it should look like
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url,
    }
}

// server startup
const server = new GraphQLServer({
    typeDefs: `./src/schema.graphql`,
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'http://localhost:4466',
            secret: 'mysecret123',
            debug: true,
        })
    })
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
