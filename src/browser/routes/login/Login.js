import React from 'react';

import Chunk from '../../components/split_chunk';

const loadChunk = () => import(/* webpackChunkName: "login" */ '../../components/layout_login');
const LoginRoute = () => <Chunk load={loadChunk}/>;

// export
export default LoginRoute;

