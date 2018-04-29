import { Component } from 'react';
import PropTypes from 'prop-types';

export class TardisMainStart extends Component {
  componentWillMount = () => {
    performance.clearMarks();
    performance.clearMeasures();
    performance.mark(`start-${this.props.component}-page`);
  };

  componentDidUpdate = () => {
    if (this.props.endCondition && this.props.endCondition()) {
      performance.mark(`end-${this.props.component}-page`);
      performance.measure('main-component-load-time', `start-${this.props.component}-page`, `end-${this.props.component}-page`);
      window.tardis.sendOnceBy(this.props.app, `${this.props.component}/main-content`, 'measure');
    }
  };

  render() {
    return (
      this.props.children
    );
  }
}

TardisMainStart.propTypes = {
  children: PropTypes.node,
  app: PropTypes.string,
  component: PropTypes.string,
  endCondition: PropTypes.func
};

TardisMainStart.defaultProps = {
  children: null,
  app: null,
  component: null,
  endCondition: null
};

export default TardisMainStart;
