import React from "react"

import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

const LandingLayout = (props) => {
    return (
        <div>
            <div style={{marginLeft: '45px'}}>
                <div style={{minHeight:"90vh"}}>
                    <LandingHeader/>
                    {props.children}
                </div>
                <LandingFooter/>
            </div>
        </div>
        
    )
}


export default LandingLayout;