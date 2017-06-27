import React from 'react';
import axios from 'axios';

import AgentGraph from '../AgentGraph';
import AgentFilters from '../AgentInputs';

export default class TabContent extends React.Component {

  state = {
    agents: [],
    loading: false,
    newAgentName: ''
  };

  componentDidMount() {
    this._fetchAgents();
  }

  handleFilterChange = e => {
    const re = new RegExp(`^${e.target.value.toLowerCase()}`);
    this.setState({agents: this.agents.filter(item => re.test(item.name.toLowerCase()))});
  };

  _getRandomInt = () => {
    const min = 0;
    const max = 80;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  handleAddAgent = () => {
    const newAgent = {
      name: this.state.newAgentName,
      positive: this._getRandomInt(),
      neutral: this._getRandomInt(),
      negative: this._getRandomInt()
    };
    this.agents = this.agents.concat([newAgent]);
    this.setState({agents: this.agents, newAgentName: ''});
  };

  handleNewAgentNameChange = e => {
    this.setState({newAgentName: e.target.value});
  };

  _fetchAgents = () => {
    this.setState({loading: true});
    axios.get('/agents.json')
      .then(res => {
        this.agents = res.data;
        this.setState({agents: this.agents, loading: false});
      })
      .catch(err => {
        console.error(err);
        this.setState({loading: false});
      });
  };

  render() {
    const {agents, loading, newAgentName} = this.state;
    return (
      <div className="tabs-content">
        <AgentFilters newAgentName={newAgentName}
                      onFilterChange={this.handleFilterChange}
                      handleNewAgentNameChange={this.handleNewAgentNameChange}
                      onAddAgent={this.handleAddAgent}
        />
        <AgentGraph loading={loading} agents={agents} />
      </div>
    )
  }
}