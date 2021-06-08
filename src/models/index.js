// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Movie, Season, Episode, Blog, Post, Comment } = initSchema(schema);

export {
  Category,
  Movie,
  Season,
  Episode,
  Blog,
  Post,
  Comment
};