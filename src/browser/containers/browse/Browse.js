import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import LayoutBrowse from 'Browser/components/layout_browse';

import CARDS_QUERY from 'Client/graphql/queries/CardQuery.gql';

/**
 * Browse Container
 */
class Browse extends React.Component {

  static propTypes = {
    data : PropTypes.shape({
      loading   : PropTypes.bool,
      error     : PropTypes.object,
      card_list : PropTypes.array,
    }).isRequired
  }

  render () {
    // Render Cards
    return <LayoutBrowse {...this.props.data} />;
  }
}

// Operation
const operation = {
  options : {
    fetchPolicy : 'cache-and-network'
  }
};

// With Data HOC
const withData = graphql(CARDS_QUERY, operation);

// Export
export default withData(Browse);
