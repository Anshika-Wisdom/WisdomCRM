import React, { Component } from 'react'
import axios from 'axios';
import "./leadfollowupanalysis.css";
export default class leadfollowupnalaysistable1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lead: null,
        }
    }
    componentDidMount() {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: 'https://maxifysales.com:5000/api/rep/getCallReportData/148/VW_LEADS_FOLLOWUP',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then((response) => {
                this.setState({ lead: response.data })
                //    console.log(this.setState)        
            })
            .catch(function (error) {
                console.log(error);
            });
    }
     
    
    render() {
        // console.log(this.state)
        return (
            <>
                <div className="card card1 text-center">
                    <div className="card-body p-1">
                        <div className="row">
                            <div className="col-lg-10">
                                <h5>Who has how many leads?</h5>
                            </div>
                            <div className="col-lg-2">
                                <span
                                    data-toggle="modal"
                                    data-target="#exampleModalLong">
                                    <i className="fa fa-arrows"></i>
                                </span>
                            </div>
                        </div>
                        {/* modal */}
                        <div className="modal fade"
                            id="exampleModalLong"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLongTitle"
                            aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Who has how many leads?</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table bg-light ">
                                            <thead className="table_data">
                                                <tr >
                                                    <th>Name</th>
                                                    <th># of leads</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.lead !== null && this.state.lead.map(l1 => (
                                                    <tr>
                                                        <td>{l1.FIRSTNAME}</td>
                                                        <td>{l1.TOTAL_LEAD}</td>
                                                    </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* table start */}
                        <table className="table table1 bg-light tab_heading">
                            <thead className="table_data">
                                <tr >
                                    <th>Name</th>
                                    <th># of leads</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lead !== null && this.state.lead.slice(0, 4).map(l1 => (
                                    <tr>
                                        <td>{l1.FIRSTNAME}</td>
                                        <td>{l1.TOTAL_LEAD}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>


        )
    }
}


