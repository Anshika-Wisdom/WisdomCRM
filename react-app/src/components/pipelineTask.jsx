import axios from "axios";
import React, { Component } from "react";
import "./stylesheet.css";

class PipelineTask extends Component {
  state = {
    taskName: this.props.taskName,
    objTask: { "Not Started": [], Overdue: [], Completed: [] },
    objLength: { "Not Started": "", Overdue: "", Completed: "" },
    dragIndex: -1,
    dragID: -1,
    dropFlag: false,
    deleteFlag: false,
    completeFlag: false,
    ellipsisDrop: false,
  };

  async componentDidMount() {
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/getTaskData/35/126";
    let { data: tasks } = await axios.get(apiEndPoint);
    // console.log(tasks);
    this.setState({ tasks });
  }

  async componentDidUpdate() {
    //console.log("UPDATE");

    let { dropFlag, deleteFlag,completeFlag } = this.state;
    // console.log(deleteFlag);
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/getTaskData/35/126";
    if (dropFlag || deleteFlag || completeFlag) {
      //console.log("UPDATE1");
      let { data: tasks } = await axios.get(apiEndPoint);
      // console.log(tasks);
      this.setState({ dropFlag: false, tasks, deleteFlag: false,completeFlag: false });
    }
  }

  onDragStart = (ev, index, id) => {
    //console.log(id);
    //console.log(obj);
    this.setState({ dragIndex: index, dragID: id });
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = async (ev, status) => {
    ev.preventDefault();
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/taskStatus/35";
    let { dragID } = this.state;

    let obj = { id: dragID, status: status };
    let { data: taskPost } = await axios.put(apiEndPoint, obj);

    this.setState({ dropFlag: true, dragID: -1 });
  };

  // handlePhone = () => {
  //   window.location =
  // }

  // handleComplete = async () => {
  //   let tasksAll = [...this.state.tasks];
  //   // console.log("tasks");
  //   let result = tasksAll.filter((obj) => obj.isChecked === true);
  //   //console.log(result);
  //   var strID = "";
  //   if (result !== undefined && result.length > 0) {
  //     console.log(result);
  //     for (let i = 0; i < result.length; i++) {
  //       strID += i !== result.length - 1 ? result[i].ID + "," : result[i].ID;
  //     }
  //     var obj = { id: strID, status: "Completed" };
  //     console.log(obj);

  //     let apiEndPoint = "https://maxifysales.com:5000/api/tasks/taskStatus/35";
  //     //console.log("Complete");
  //     if(window.confirm("Are you sure you want to update the status to complete?")){
  //     let { data: tasks } = await axios.put(apiEndPoint, obj);
  //     this.setState({ tasks, completeFlag: true });
  //     }
  //   }
  // };

  handleDelete = async (id) => {
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/taskDeactive/35";
    let obj = { id: id, isactive: 0 };
   if(window.confirm("Are you sure you want to delete?")){
    let { data: taskActive } = await axios.put(apiEndPoint, obj);
    this.setState({ deleteFlag: true,taskActive });
    }
    // var data = JSON.stringify({ id: id });

    // var config = {
    //   method: "delete",
    //   url: "http://localhost:5000/api/taskWisdom/tasks/35",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };
    // // window.confirm("Are you sure you want to delete?");
    // if (window.confirm("Are you sure you want to delete?")) {
    //   axios(config)
    //     .then((response) => {
    //       // console.log(JSON.stringify(response.data));
    //       this.setState({ deleteFlag: true });
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //}
  };

  handleEllipsis = () => {
    this.setState({ ellipsisDrop: true });
  };

  handleAction = (userid, taskid) => {
    console.log(userid,taskid);
    var apiEndpoint =
      "https://maxifysales.com/imaginesales/contacts.php#!/profile?user=" +
      userid +
      "&task_id=" +
      taskid +
      "&task=Call";

      window.location = apiEndpoint;
  };

  render() {
    let { objTask, taskName, objLength, tasks } = this.state;
    var result, length;
    if (tasks !== undefined) {
     // console.log(tasks);
      for (let i = 0; i < taskName.length; i++) {
        var status = taskName[i];
        result = tasks.filter(
          (task) => task.STATUS === status && task.PRIORITY === "High" && task.IS_ACTIVE === 1
        );
        objTask[status] = result;
        objLength[status] = result.length;
       // console.log(objTask);
      }
    }

    return (
      <>
        {tasks !== undefined && (
          <div>
            <div className="row fixed-top header">
              {Object.keys(objTask).map((t1, ind) => (
                <div className="col-4 arrow" key={t1}>
                  <div className="row">
                    <div className="col-11">
                      <span className="card-title font-weight-bold pipe">
                        {t1}
                      </span>
                      <br />
                      {t1 === "Not Started" && (
                        <span className="pipe">
                          {objLength["Not Started"]} records
                        </span>
                      )}
                      {t1 === "Overdue" && (
                        <span className="pipe">
                          {objLength["Overdue"]} records
                        </span>
                      )}
                      {t1 === "Completed" && (
                        <span className="pipe">
                          {objLength["Completed"]} records
                        </span>
                      )}
                    </div>
                    {ind < 2 && (
                      <div className="col-1">
                        <svg width="16" height="58">
                          <path
                            className="arrow__right"
                            fill="#F7F7F7"
                            d="M0 0h16v56H0Z"
                          ></path>
                          <path
                            className="arrow__border"
                            fill="#E5E5E5"
                            d="M1 0l8 28-8 28H0V0Z"
                          ></path>
                          <path
                            className="arrow__left"
                            fill="#F7F7F7"
                            d="M0 1l8 27-8 27Z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="row bg bg-light">
              {Object.values(objTask).map((task, ind) => (
                <div
                  className="col-4 task"
                  key={task.length > 0 ? task[ind].ID : ""}
                  onDragOver={(event) => this.onDragOver(event)}
                  onDrop={(event) => this.onDrop(event, taskName[ind])}
                >
                  {task.length > 0
                    ? task.map((val, index) => (
                        <div
                          key={val.ID}
                          className="card stage"
                          draggable
                          onDragStart={(event) =>
                            this.onDragStart(event, index, val.ID)
                          }
                        >
                          <div className="row">
                            <div className="col-10">
                              {(val.CONTACTS_FIRSTNAME !== null ||
                                val.CONTACTS_LASTNAME !== null) &&
                              (val.CONTACTS_FIRSTNAME !== "" ||
                                val.CONTACTS_LASTNAME !== "") &&
                              (val.CONTACTS_FIRSTNAME !== undefined ||
                                val.CONTACTS_LASTNAME !== undefined) ? (
                                <div className="space">
                                  Contact: {val.CONTACTS_FIRSTNAME}{" "}
                                  {val.CONTACTS_LASTNAME}
                                </div>
                              ) : (
                                <div className="space">
                                  Contact: Not Available
                                </div>
                              )}
                              <div className="stageMargin">
                                Task: {val.TASK}
                              </div>
                            </div>

                            <div>
                              {(val.TASK === "Call" ||
                                val.TASK === "Call Back") && (
                                <div
                                  className="phone"
                                  title="Profile Visit"
                                  onClick={() =>
                                    this.handleAction(val.CONTACT_ID, val.ID)
                                  }
                                >
                                  <i className="fa fa-phone"></i>
                                </div>
                              )}

                              {val.TASK === "Email" && (
                                <div className="phone" title="Profile Visit"  onClick={() =>
                                  this.handleAction(val.CONTACT_ID, val.ID)
                                }>
                                 
                                    <i className="fa fa-envelope"></i>
                                </div>
                              )}
                              <div
                                className="trash"
                                title="Delete Proposal"
                                onClick={() => this.handleDelete(val.ID)}
                              >
                                <i className="fa fa-trash-o"></i>
                              </div>
                              {/* <div
                                className="ellipsis"
                                onClick={() => this.handleEllipsis()}
                              >
                                <i
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                ></i>
                              </div>
                               {this.state.ellipsisDrop === true && (
                                <div onClick={() => this.handleComplete()}>
                                  <select className="dropEllipsis">
                                    <option>Complete</option>
                                  </select>
                                </div>
                              )} */}
                            </div> 
                          </div>
                        </div>
                      ))
                    : ""}
                  <div className="plus">
                    <div data-toggle="modal" data-target="#pipeModal">
                      <i className="fa fa-plus"></i>
                    </div>
                    <div
                      className="modal fade"
                      id="pipeModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="modalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">
                              Add a Task
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">...</div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PipelineTask;
