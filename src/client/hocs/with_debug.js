import React from 'react';

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
