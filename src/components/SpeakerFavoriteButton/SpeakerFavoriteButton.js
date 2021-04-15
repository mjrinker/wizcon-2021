import React from 'react';

const SpeakerFavoriteButton = ({
  isFavorite,
  onToggle,
  showErrorButton,
  size,
}) => {
  const textSize = size ? `text-${size}` : '';
  const onKeyHandler = (event) => {
    if (event.key === 'Enter') {
      onToggle();
    }
  };

  let heartIconType = 'empty';
  if (showErrorButton) {
    heartIconType = 'broken';
  } else if (isFavorite) {
    heartIconType = 'filled';
  }

  const classList = [
    `icon-heart-${heartIconType}`,
    textSize,
  ];

  return (
    <div
      className={classList.join(' ')}
      onClick={onToggle}
      onKeyPress={onKeyHandler}
      role='button'
      tabIndex={0}
    />
  );
};

export default SpeakerFavoriteButton;
