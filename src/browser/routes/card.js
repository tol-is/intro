import React from 'react';

import Chunk from 'Browser/components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "card" */ 'Browser/containers/card');
const CardRoute = (props) => <Chunk load={loadChunk} {...props} />;

// export
export default CardRoute;

