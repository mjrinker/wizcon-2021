import React from 'react';

const ToggleSwitch = ({
  idName,
  onToggle,
}) => (
  <div className='toggle'>
    <input
      id={idName}
      onClick={onToggle}
      type='checkbox'
    />
    <label
      className='toggle-item'
      htmlFor={idName}
    ></label>
  </div>
);

export default ToggleSwitch;
