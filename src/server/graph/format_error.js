const logger = require('minilog')('graphql');
const apolloErrors = require('graphql-apollo-errors');

const {
  formatErrorGenerator,
  initSevenBoom
} = apolloErrors;

// Initialize Seven Boom
initSevenBoom([
  {
    name  : 'errorName',
    order : 1
  }
]);

/**
  const { SevenBoom } = require('graphql-apollo-errors');
  const errorMessage = `Card with id: ${ _id } not found`;
  const errorData = { _id };
  const errorName = 'CARD_NOT_FOUND';
  const err = SevenBoom.notFound(errorMessage, errorData, errorName);
  throw err;
*/

// format error
module.exports.formatError = () => formatErrorGenerator({
  logger,
  hooks: {
    onOriginalError: e => {
      logger.warn(e.message);
    },
  }
});

