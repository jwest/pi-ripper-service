import React from 'react';

import TopBar from './TopBar';
import RipList from './RipList';

class App extends React.Component {

  componentDidMount() {
    setInterval(() => {
      fetch('/api/v1/disks?sort=updatedAt&order=desc&limit=1')
        .then(res => res.json())
        .then(body => {
          this.setState({disks: body});
        });
    }, 2000);
  }

  render() {
    const state = this.state || {};
    const disks = state.disks || [];
    return (
      <div>
        <TopBar />
        <RipList disks={disks} />
      </div>
    );
  }
}

export default App;
