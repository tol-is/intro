import React from 'react';

import Chunk from '../../components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "browse" */ '../../components/layout_browse');
const BrowseRoute = () => <Chunk load={loadChunk}/>;

// export
export default BrowseRoute;

