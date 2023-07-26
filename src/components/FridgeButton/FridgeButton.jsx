import React from 'react';
import FridgeButton from './FridgeButton';

const FridgeButton = () => {
  return (
    <div className="fridge-button">
      <ButtonIcon isRound={true} icona={<span>+</span>} />
    </div>
  );
};

export default FridgeButton;
