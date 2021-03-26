import React, { Component } from 'react'
import axios from 'axios';
import "./leadfollowupanalysis.css";
export default class leadfollowupanalysistable3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lead3: null,
        }
    }
    componentDidMount() {
        var data = JSON.stringify({});
        var config = {
            method: 'post',
            url: 'https://maxifysales.com:5000/api/rep/getCallReportData/148/VW_UNTOUCH_AGEING',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then((response) => {
                this.setState({ lead3: response.data })
                //    console.log(this.setState)        
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        // console.log(this.state)
        return (
            <div className="card  card1 text-center">
                <div className="card-body p-2">
                    <div className="row">
                        <div className="col-lg-10">
                            <h5 className="h_5">  Deep analysis on Untouched leads</h5>
                        </div>
                        <div className="col-lg-2">
                            <span
                                data-toggle="modal"
                                data-target="#exampleModalLong2">
                                <i className="fa fa-arrows"></i>
                            </span>
                        </div>
                        <div className="modal fade"
                            id="exampleModalLong2"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLongTitle2"
                            aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle2">Deep analysis on Untouched leads</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col">
                                                <table className="table bg-light ">
                                                    <thead className="table_data">
                                                        <tr className="table_data">
                                                            <th>Name</th>
                                                            <th>0 to 5 days</th>
                                                            <th>6 to 10 days</th>
                                                            <th>11 to 20 days</th>
                                                            <th>Above 20 days </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.lead3 !== null && this.state.lead3.map(l3 => (
                                                            <tr>
                                                                <td>{l3.firstname}</td>
                                                                <td>{l3["0_to_5_DAYS"]}</td>
                                                                <td>{l3["6_to_10_DAYS"]}</td>
                                                                <td>{l3["11_to_20_DAYS"]}</td>
                                                                <td>{l3["MORE_THAN_20_DAYS"]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table1 bg-light tab_heading ">
                        <thead className="table_data">
                            <tr className="table_data">
                                <th>Name</th>
                                <th>0 to 5 days</th>
                                <th>6 to 10 days</th>
                                <th>11 to 20 days </th>
                                <th>Above 20 days</th>
                            </tr>
                        </thead>
                        <tbody className="tab_font">
                            {this.state.lead3 !== null && this.state.lead3.slice(0, 4).map(l3 => (
                                <tr>
                                    <td>{l3.firstname}</td>
                                    <td>{l3["0_to_5_DAYS"]}</td>
                                    <td>{l3["6_to_10_DAYS"]}</td>
                                    <td>{l3["11_to_20_DAYS"]}</td>
                                    <td>{l3["MORE_THAN_20_DAYS"]}</td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
