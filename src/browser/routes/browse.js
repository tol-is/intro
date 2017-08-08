import React from 'react';

import Chunk from '../components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "browse" */ '../containers/browse');
const BrowseRoute = (props) => <Chunk load={loadChunk} {...props} />;

// export
export default BrowseRoute;

