import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';

import ReactModal from 'react-modal';

import CreateCardForm from 'Browser/components/create_card_form';

import CREATE_CARD_MUTATION from 'Client/graphql/mutations/CreateCard.gql';

class CreateCard extends React.Component {

  static propTypes = {
    submit           : PropTypes.func,
    previousLocation : PropTypes.object
  };

  state = {
    active : true
  };

  closeModal = () => {
    this.setState({active : false});
  }

  handleSubmit = (values) => {
    console.log(values);

    const { submit } = this.props;

    submit(values)
      .then((response) => {
        this.setState({
          saved : true,
          card  : response.data.create_card
        });
      })
      .catch(() => {
      });
  }

  render() {
    if(this.state.saved){
      return (
        <Redirect to={{
          pathname : `/card/${this.state.card._id}`,
          state    : { modal : true }
        }}/>
      );
    }

    if (!this.state.active) {
      return (<Redirect push to={this.props.previousLocation}/>);
    }

    return (
      <ReactModal
        isOpen={this.state.active}
        contentLabel={'Create new card'}
        onRequestClose={this.closeModal}
      >
        <CreateCardForm handleSubmit={this.handleSubmit}/>
        <button onClick={this.closeModal}>Close Modal</button>
      </ReactModal>
    );
  }
}

// Openration
const operation = {
  props : ({ mutate }) => {
    return ({
      submit : (values) => {
        return mutate({
          variables : values,
          // updateQueries: {
          //   CardsQuery: (prev, { mutationResult }) => {
          //     const newCard = mutationResult.data.create_card;
          //     return update(prev, {
          //       cards: {
          //         $unshift: [newCard]
          //       }
          //     });
          //   }
          // }
        });
      }
    });
  }
};

// With Mutation HOC
const withMutation = graphql(CREATE_CARD_MUTATION, operation);

// Export
export default withMutation(CreateCard);
