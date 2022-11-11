import React, { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';

import './overlay.scss';

function Overlay() {
  const stateMenu = useContext(AppContext);
  const overlayVisible = stateMenu ? 'overlay_visible' : null;

  return <div className={`overlay ${overlayVisible}`} />;
}

export default Overlay;

// overlay_visible
