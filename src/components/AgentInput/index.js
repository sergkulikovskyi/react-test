import React from 'react';
import PropTypes from 'prop-types';

const AgentInput = ({title, filter, ...rest}) => (
  <div className="agent-filter">
    <label>{title}:</label>
    <input value={filter} {...rest} />
  </div>
);

AgentInput.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string
};

export default AgentInput