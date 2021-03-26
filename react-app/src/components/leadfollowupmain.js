import React, { Component } from 'react'
import Leadfollowupnalaysistable1 from './leadfollowupnalaysistable1';
import Leadfollowupnalaysistable2 from "./leadfollowupanalysistable2";
 import Leadfollowupanalysistable3 from "./leadfollowupanalysistable3";
export default class Leadfollowupmain extends Component {
        render() {      
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                            <Leadfollowupnalaysistable1 />
                            </div>
                             <div className="col-lg-5">
                             <Leadfollowupnalaysistable2 />
                             </div> 
                            <div className="col-lg-4">
                            <Leadfollowupanalysistable3 />
                            </div> 
                        </div>
                    </div>

                </>
            )
        }
    }
