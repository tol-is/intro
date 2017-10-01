import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import ReactModal from 'react-modal';

import Loading from 'Browser/components/loading';

import CARD_QUERY from 'Client/graphql/queries/SingleCardQuery.gql';

class Card extends React.Component {

  static propTypes = {
    previousLocation : PropTypes.object,
    match            : PropTypes.object,
    data             : PropTypes.shape({
      loading         : PropTypes.bool,
      error           : PropTypes.object,
      card_find_by_id : PropTypes.object,
    }).isRequired
  }

  state = {
    active : true,
    errors : []
  };

  closeModal = () => {
    this.setState({active : false});
  }

  renderCard(){
    const card = this.props.data.card_find_by_id;

    return (
      <div>
        <h1>Card Details</h1>
        {card.title}<br />
        {card.description}<br />
        {card.created_date}<br />
        {card.owner.name_first}
      </div>
    );
  }

  render (){

    const {
      loading
    } = this.props.data;

    if (!this.state.active) {
      return (<Redirect push to={this.props.previousLocation}/>);
    }

    return (
      <ReactModal
        isOpen={this.state.active}
        contentLabel={loading ? "Loading" : this.props.data.card_find_by_id.title}
        onRequestClose={this.closeModal}
      >
        { loading ? <Loading/> : this.renderCard() }
        <button onClick={this.closeModal}>Close Modal</button>
      </ReactModal>
    );
  }
}

// Operation
const operation = {
  options : props => ({
    variables : {
      id : props.match.params.id
    },
    fetchPolicy : 'cache-and-network'
  })
};

// With Data HOC
const withData = graphql(CARD_QUERY, operation);

// Export
export default withData(Card);
