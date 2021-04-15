import React from 'react';
import { SimpleImg } from 'react-simple-img';

const SpeakerImage = ({
  fullName,
  speakerId,
}) => {
  const imageUrl = `/images/speakers/speaker-${speakerId}.jpg`;
  return (
    <SimpleImg
      alt={fullName}
      animationDuration='1'
      applyAspectRatio={true}
      height={540}
      imgStyle={{ borderRadius: '9999px' }}
      placeholder={false}
      src={imageUrl}
      width={540}
    />
  );
};

export default SpeakerImage;
