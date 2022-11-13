import React, { useState } from 'react';

import './buttonlike.scss';

function ActionButtonLike() {
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  const cardLikeButtonClassName = `button-card-like ${isLiked ? 'button-card-like_active' : null}`;

  return (
    <button
      type="button"
      className={cardLikeButtonClassName}
      onClick={handleLikeClick}
      aria-label="Сохранить фильм"
    />
  );
}

export default ActionButtonLike;
