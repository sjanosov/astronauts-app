import React from 'react';
import classNames from 'classnames';


function AstronautPopUpPanel(props:any) {
    console.log(!props.isNotificationShown) 

    const cssClassname = classNames("astro-popup-wrapper", {"closed": !props.isNotificationShown}, props.type )
  return (
    <div className={cssClassname}>
        <div className="astro-popup-panel">
            <p>Astronaut {props.notifiedAstronaut?.name} has been successfuly {props.type}!</p>
        </div>
    </div>
    
  )
}

export default AstronautPopUpPanel