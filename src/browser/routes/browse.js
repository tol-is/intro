import React from 'react';

import Chunk from 'Browser/components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "browse" */ 'Browser/containers/browse');
const BrowseRoute = (props) => <Chunk load={loadChunk} {...props} />;

// export
export default BrowseRoute;

