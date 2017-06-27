import React from 'react';
import PropTypes from 'prop-types';

import AgentInput from '../AgentInput';

const AgentInputs = ({onFilterChange, onAddAgent, newAgentName, handleNewAgentNameChange}) => (
  <div className="agent-filters">
    <AgentInput title="Filter" onChange={onFilterChange} />
    <AgentInput title="New Agent Name"
                onChange={handleNewAgentNameChange}
                value={newAgentName}
                onKeyPress={(e) => {(e.key === 'Enter' ? onAddAgent() : null)}}
    />
  </div>
);

AgentInputs.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onAddAgent: PropTypes.func.isRequired,
  handleNewAgentNameChange: PropTypes.func.isRequired,
  newAgentName: PropTypes.string
};

export default AgentInputs;