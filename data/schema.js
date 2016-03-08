/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  App,
  PreviewArticle,
  FullArticle,
  getApp,
  getArticlePreviews,
  getFullArticle,
  getArticlePreview
} from './database';

var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
      var {type, id} = fromGlobalId(globalId);
      if (type === 'App') {
        return getApp(id);
      } else if (type === 'FullArticle') {
        return getFullArticle(id);
      } else if (type === 'PreviewArticle') {
        return getArticlePreview(id);
      } else {
        return null;
      }
    },
    (obj) => {
      if (obj instanceof App) {
        return appType;
      } else if (obj instanceof FullArticle) {
        return fullArticleType;
      } else if (obj instanceof PreviewArticle)  {
        return previewArticleType;
      } else {
        return null;
      }
    }
);

var appType = new GraphQLObjectType({
  name: 'App',
  description: 'App',
  fields: () => ({
    id: globalIdField('App'),
    articlePreviews: {
      type: articlePreviewsConnection,
      description: 'Initial previews',
      args: connectionArgs,
      resolve: (app, args) => connectionFromArray(getArticlePreviews(), args),
    }
  }),
  interfaces: [nodeInterface]
});

var fullArticleType = new GraphQLObjectType({
  name: 'FullArticle',
  description: 'Full article',
  fields: () => ({
    id: globalIdField('FullArticle'),
    title: {
      type: GraphQLString,
      description: 'Article title',
      resolve: fullArticle => fullArticle.title
    },
    image: {
      type: GraphQLString,
      description: 'Article image',
      resolve: fullArticle => fullArticle.image
    },
    content: {
      type: GraphQLString,
      description: 'Article content',
      resolve: fullArticle => fullArticle.content
    }
  }),
  interfaces: [nodeInterface]
});

var previewArticleType = new GraphQLObjectType({
  name: 'PreviewArticle',
  description: 'Article preview',
  fields: () => ({
    id: globalIdField('PreviewArticle'),
    articleId: {
      type: GraphQLString,
      description: 'Article id',
      resolve: previewArticle => previewArticle.id
    },
    title: {
      type: GraphQLString,
      description: 'Article title',
      resolve: previewArticle => previewArticle.title
    },
    preview: {
      type: GraphQLString,
      description: 'Article preview image url',
      resolve: previewArticle => previewArticle.preview
    },
    type: {
      type: GraphQLString,
      description: 'Article type',
      resolve: previewArticle => previewArticle.type
    }
  }),
  interfaces: [nodeInterface]
});

var {connectionType: articlePreviewsConnection} =
    connectionDefinitions({name: 'PreviewArticle', nodeType: previewArticleType});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    app: {
      type: appType,
      resolve: () => getApp()
    },
    fullArticle: {
      type: fullArticleType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (parent, args) => getFullArticle(args.id)
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
