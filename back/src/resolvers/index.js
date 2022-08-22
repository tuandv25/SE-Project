import { createRequire } from "module";
const require = createRequire(import.meta.url);
import Query from './Query.js';
import Mutation from './Mutation.js';
import Subscription from './Subscription.js';
const {
    GraphQLUpload,
  } = require('graphql-upload');
const resolvers = {
    Query,
    Upload: GraphQLUpload,
    Mutation,
    Subscription
};
export default resolvers; 