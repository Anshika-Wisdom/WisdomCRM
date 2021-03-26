import React, { Component } from 'react';
import axios from 'axios';
import "./leadfollowupanalysis.css";
export default class leadfollowupanalysistable2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lead1: null,
        }
    }
    componentDidMount() {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: 'https://maxifysales.com:5000/api/rep/getCallReportData/148/VW_NOT_ANS_ATTEMPT_RANGE',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then((response) => {
                this.setState({ lead1: response.data })
                //    console.log(this.setState)        
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <>
                <div className="card card1 text-center">
                    <div className="card-body card1 p-3">
                        <div className="row">
                            <div className="col-lg-10">
                                <h5> Deep analysis of Not Answered call</h5>
                            </div>
                            <div className="col-lg-2">
                                <span
                                    data-toggle="modal"
                                    data-target="#exampleModalLong1">
                                    <i className="fa fa-arrows"></i>
                                </span>
                            </div>
                            <div className="modal fade"
                                id="exampleModalLong1"
                                tabindex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalLongTitle1"
                                aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle1 ">Deep analysis of Not Answered call</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row">
                                                <table className="table bg-light ">
                                                    <thead className="table_data">
                                                        <tr className="table_data">
                                                            <th>Name</th>
                                                            <th>0 to 3</th>
                                                            <th>4 to 5</th>
                                                            <th>6 to 9</th>
                                                            <th>10 to 15</th>
                                                            <th>Above 15</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.lead1 !== null && this.state.lead1.map(l2 => (
                                                            <tr>
                                                                <td>{l2.user_name}</td>
                                                                <td>{l2["0_to_3_attempts"]}</td>
                                                                <td>{l2["4_to_5_attempts"]}</td>
                                                                <td>{l2["6_to_9_attempts"]}</td>
                                                                <td>{l2["10_to_15_attempts"]}</td>
                                                                <td>{l2["more_than_15_attempts"]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* modal */}
                        {/* table */}
                        <table className="table bg-light tab_heading">
                            <thead>
                                <tr className="table_data1">
                                    <th className="table_data">Name</th>
                                    <th className="table_data">0 to 3</th>
                                    <th className="table_data">4 to 5</th>
                                    <th className="table_data">6 to 9</th>
                                    <th className="table_data">10 to 15</th>
                                    <th className>Above 15</th>
                                </tr>
                            </thead>
                            <tbody className="tab_font">
                                {this.state.lead1 !== null && this.state.lead1.slice(0, 4).map(l2 => (
                                    <tr>
                                        <td>{l2.user_name}</td>
                                        <td>{l2["0_to_3_attempts"]}</td>
                                        <td>{l2["4_to_5_attempts"]}</td>
                                        <td>{l2["6_to_9_attempts"]}</td>
                                        <td>{l2["10_to_15_attempts"]}</td>
                                        <td>{l2["more_than_15_attempts"]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* table */}

                    </div>
                </div>
            </>
        )
    }
}
