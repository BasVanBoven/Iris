
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coreActions from '../services/core/actions';
import { SnapStream } from './SnapStream';

class Stream extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    if (props.enabled && props.streaming_enabled) {
      this.start();
    }
  }

  start = () => {
    const {
      host,
      port,
      ssl,
      username,
    } = this.props;

    if (this.snapstream) {
      this.snapstream.play();
    } else {
      const protocol = (ssl ? 'wss' : 'ws');
      console.log(protocol, host, port, username);
      this.snapstream = new SnapStream(protocol, host, port, 'Iris');
    }
  }

  stop = () => {
    if (this.snapstream) {
      this.snapstream.stop();
      this.snapstream = null;
    }
  }

  componentDidUpdate = ({
    streaming_enabled: prevStreamingEnabled,
  }) => {
    const {
      enabled,
      streaming_enabled,
    } = this.props;

    if (!prevStreamingEnabled && enabled && streaming_enabled) {
      this.start();
    }
    if (!enabled || !streaming_enabled) {
      this.stop();
    }
  }

  render = () => null;
}

const mapStateToProps = (state) => {
  const {
    snapcast: {
      enabled,
      streaming_enabled,
      host,
      port,
      ssl,
    },
    pusher: {
      username,
    },
  } = state;

  return {
    enabled,
    streaming_enabled,
    host,
    port,
    ssl,
    username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  coreActions: bindActionCreators(coreActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
