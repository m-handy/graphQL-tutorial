const { GraphQLServer } = require('graphql-yoga')

// dummy data
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Full-stack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.facebook.com',
  description: 'prostě fejbuček'
}]

// ID counter
let idCount = links.length

// schema implementation - resolvers have to be named same as fields in schema.graphql
const resolvers = {
    Query: {
        info: () => `This is API of Hackernews Clone`,
        feed: () => links,
        link: (root, args) => links[args.id]
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
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
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
