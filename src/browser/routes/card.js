import React from 'react';

import Chunk from '../components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "card" */ '../containers/card');
const CardRoute = (props) => <Chunk load={loadChunk} {...props} />;

// export
export default CardRoute;

