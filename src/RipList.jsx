import React from 'react';

import Rip from './Rip';

function RipList(props) {
  const disks = props.disks || [];
  return disks.map((disk, i) => <Rip key={i} disk={disk} />);
}

export default RipList;
