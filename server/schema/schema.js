const graphql = require('graphql');
const _ = require('lodash');
const Content = require('../models/content');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const ContentType = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    id: { type: GraphQLID },
    country: { type: GraphQLString },
    brand: { type: GraphQLString },
    title: { type: GraphQLString },
    thumbnail: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    content: {
      type: GraphQLList(ContentType),
      args: { country: { type: GraphQLString }, brand: { type: GraphQLString }},
      resolve(parent, args){
        if (args.country==="" && args.brand===""){
          return Content.find({});
        }
        if (args.country!=="" && args.brand===""){
          return Content.find({country: args.country});
        }
        if (args.country==="" && args.brand!==""){
          return Content.find({brand: args.brand});
        }
        return Content.find({country: args.country, brand: args.brand});
      }
    },
    contentById: {
      type: ContentType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        return Content.findById(args.id);
      }
    },
    contents: {
      type: GraphQLList(ContentType),
      resolve(parent, args){
        return Content.find({});
      }
    },
    countries: {
      type: GraphQLList(GraphQLString),
      resolve(parent, args){
        return Content.find({}).distinct('country');
      }
    },
    brands: {
      type: GraphQLList(GraphQLString),
      resolve(parent, args){
        return Content.find({}).distinct('brand');
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addContent: {
      type: ContentType,
      args: {
        country: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        thumbnail: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args){
        let content = new Content({
          country: args.country,
          brand: args.brand,
          title: args.title,
          thumbnail: args.thumbnail
        });
        return content.save();
      }
    },
    editContent: {
      type: ContentType,
      args: {
        country: { type: GraphQLString },
        brand: { type: GraphQLString },
        title: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        return Content.findById(args.id).update({
          country: args.country,
          brand: args.brand,
          title: args.title,
          thumbnail: args.thumbnail
        });
      }
    },
    deleteContent: {
      type: ContentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        return Content.delete(args.id);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
