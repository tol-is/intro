import React, { Component } from 'react';

export default function(ComposedComponent) {
  class WithResize extends Component {

    constructor() {
      super();
      this.state = {
        width:  640,
        height: 182
      }
    }

    /**
     * Calculate & Update state of new dimensions
     */
    update() {
      let width  = window.innerWidth-100;
      let height = Math.round(update_width/4.4);
      this.setState({ width, height });
    }

    /**
     * Add event listener
     */
    componentDidMount() {
      this.update();
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    /**
     * Remove event listener
     */
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
      return <ComposedComponent width={this.state.width} height={this.state.height} {...this.props} />
    }
  }
  return WithResize;
}
