import React from 'react';
import PropTypes from 'prop-types';

import MiniCard from '../minicard';
import Loading from '../loading';

class MiniCardGrid extends React.Component {

  static propTypes = {
    loading   : PropTypes.bool,
    error     : PropTypes.object,
    card_list : PropTypes.array
  }

  // Render
  render () {

    // Get Props
    const {
      loading,
      error,
      card_list
    } = this.props;

    // Render Loading
    if (loading) {
      return (<Loading/>);
    }

    // Render Error
    if (error) {
      return (<div>An unexpected error occurred</div>);
    }

    // Render Cards
    return (
      <section>
        {card_list.map(card => (
          <div key={card._id}>
            <MiniCard card={card}/>
          </div>
        ))}
      </section>
    );
  }
}

// Export
export default MiniCardGrid;
