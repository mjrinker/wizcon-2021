import React from 'react';

// eslint-disable-next-line react/display-name, react/function-component-definition
const withSpecialMessage = () => (Component) => (props) => {
  const specialMessage = 'The lecture on Love Potions at 10:30 AM has been cancelled.';

  return (
    <Component
      specialMessage={specialMessage}
      {...props}
    />
  );
};

export default withSpecialMessage;
