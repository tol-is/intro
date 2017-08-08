import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Minicard = ({ card }) => {
  return (
    <Link
      to={{
        pathname : `/card/${card._id}`,
        state    : { modal : true }
      }}>
      {card.title}
    </Link>
  );
};

Minicard.propTypes = {
  card : PropTypes.object.isRequired
};

export default Minicard;
