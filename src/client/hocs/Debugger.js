import React from 'react';

// Debugger HOC
// We are using the Inheritance Inversion technique to display
// the current state and props of the WrappedComponent (the component to debug).
export default function DebuggerHoc(WrappedComponent) {
  return class Debugger extends WrappedComponent {
    render() {
      return (
        <div>
          <h2>Debugger</h2>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <p>State</p><pre>{JSON.stringify(this.state, null, 2)}</pre>
          {super.render()}
        </div>
      );
    }
  };
}
