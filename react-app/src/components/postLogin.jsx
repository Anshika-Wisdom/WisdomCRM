import React, { Component } from "react";
import "./stylesheet.css";
import { Link } from "react-router-dom";
import ListTask from "./listTask";
import axios from "axios";
import PipelineTask from "./pipelineTask";

class PostLogin extends Component {
  state = {
    taskName: ["Not Started", "Overdue", "Completed"],
    view: 0,
    // filterFlag: false,
  };

  async componentDidMount() {
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/getTaskData/35/126";
    let { data: taskData } = await axios.get(apiEndPoint);
    this.setState({ taskData });
  }

  handleCenter = () => {
    this.setState({ view: 1 });
  };

  handleJustify = () => {
    this.setState({ view: 2 });
  };

  render() {
    // let { postLogin } = this.props;
    // console.log(postLogin);
    let { taskData, taskName, view } = this.state;
    var taskAll = [];
    if (taskData !== undefined) {
      for (let i = 0; i < taskData.length; i++) {
        //console.log(task[i]);
        let obj = taskData[i];
        obj["isChecked"] = false;
        taskAll.push(obj);
      }
    }
    return (
      <>
        <div className="row fixed-top sticky">
          <div className="col-12">
            <div className="col-3">
            </div>
            <span className="titlePipe"
              onClick={() => this.handleCenter()}
            >
              <i className="fa fa-align-center" style={{ margin: "10px" }}></i>
              <span className="textPipe">Pipeline</span>
            </span>
            <span
              className="titleList"
              // title="List"
              onClick={() => this.handleJustify()}
            >
              <i className="fa fa-align-justify" style={{ margin: "10px" }}></i>
              <span className="textList">List</span>
            </span>
            <span
              className="float-right"
              // onClick={() => this.handleFilter()}
            >
              <i className="fa fa-filter"></i>
            </span>
          </div>
        </div>
        <br />
        {view === 1 && <PipelineTask taskName={taskName} />}
        {view === 2 && <ListTask taskName={taskName} />}
      </>
    );
  }
}

export default PostLogin;
