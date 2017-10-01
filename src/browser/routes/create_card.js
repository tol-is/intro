import React from 'react';

import Chunk from 'Browser/components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "create_card" */ 'Browser/containers/create_card');
const CreateCardRoute = (props) => <Chunk load={loadChunk} {...props} />;

// export
export default CreateCardRoute;

