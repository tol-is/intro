import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from 'Browser/components/loading';

class SplitChunk extends Component {

  static propTypes = {
    load : PropTypes.func.isRequired,
  }

  state = {
    LoadedComponent : null
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      LoadedComponent : null,
    });

    props.load().then(mod => {
      this.setState({
        ready           : true,
        LoadedComponent : mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    const { ready, LoadedComponent } = this.state;
    return ready ? <LoadedComponent {...this.props} /> : <Loading />;
  }
}

export default SplitChunk;
