import { Component } from 'react';
import PropTypes from 'prop-types';

export class TardisMainEnd extends Component {
  componentDidUpdate = () => {
  };

  render() {
    return (
      this.props.children
    );
  }
}
TardisMainEnd.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string
};

TardisMainEnd.defaultProps = {
  children: null,
  name: null
};

export default TardisMainEnd;
