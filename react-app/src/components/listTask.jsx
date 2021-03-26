import React, { Component } from "react";
// import FilterTask from "./filterTask";
import axios from "axios";
import "./stylesheet.css";

class ListTask extends Component {
  state = {
    // taskAll:[],
    sortCol: 0,
    //tasks: {},
    // filterSort: false,
    deleteFlag: false,
    completeFlag: false,
    selectAll: true,
  };

  async componentDidMount() {
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/getTaskData/35/126";
    let { data: taskData } = await axios.get(apiEndPoint);
    //console.log(taskData);

    var taskAll = [];
    if (taskData !== undefined) {
      taskData["isChecked"] = false;
      // console.log(taskData);
      for (let i = 0; i < taskData.length; i++) {
        //console.log(task[i]);
        let obj = taskData[i];
        obj["isChecked"] = false;
        taskAll.push(obj);
      }
    }
    this.setState({ taskAll });
  }

  async componentDidUpdate() {
    let { completeFlag, deleteFlag } = this.state;
   // console.log(deleteFlag);
    //console.log(completeFlag);
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/getTaskData/35/126";
    if (completeFlag || deleteFlag) {
      console.log("UPDATE1");
      let { data: taskData } = await axios.get(apiEndPoint);

      var taskAll = [];
    if (taskData !== undefined) {
      taskData["isChecked"] = false;
      // console.log(taskData);
      for (let i = 0; i < taskData.length; i++) {
        //console.log(task[i]);
        let obj = taskData[i];
        obj["isChecked"] = false;
        taskAll.push(obj);
      }
    }
      this.setState({ completeFlag: false, deleteFlag: false,taskAll });
    }
  }

  handleSort = (col) => {
    this.setState({ sortCol: col });
  };

  getArrayToRender = () => {
    let { taskAll } = this.state;
    // console.log(taskAll);
    if (taskAll !== undefined && taskAll !== null && taskAll.length > 0) {
      let tasks = [...this.state.taskAll];
      switch (this.state.sortCol) {
        case 0:
          return tasks;
        case 1:
          return tasks.sort(this.sortTask);
        case 2:
          return tasks.sort(this.sortCreatedBy);
        case 3:
          return tasks.sort(this.sortAgent);
        case 4:
          return tasks.sort(this.sortCreatedDate);
        case 5:
          return tasks.sort(this.sortDueDate);
        case 6:
          return tasks.sort(this.sortStatus);
        default:
          return tasks;
      }
    }
  };

  sortTask(n1, n2) {
    return n1.TASK.localeCompare(n2.TASK);
  }

  sortCreatedBy(c1, c2) {
    return c1.FIRSTNAME.localeCompare(c2.FIRSTNAME);
  }

  sortAgent(a1, a2) {
    return a1.FIRSTNAME.localeCompare(a2.FIRSTNAME);
  }

  sortCreatedDate(d1, d2) {
    return d1.CREATEDDATE - d2.CREATEDDATE;
  }

  sortDueDate(dd1, dd2) {
    return dd1.EXPECTED_DATE.localeCompare(dd2.EXPECTED_DATE);
  }

  sortStatus(s1, s2) {
    return s1.STATUS.localeCompare(s2.STATUS);
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;
    const tasks = [...this.state.taskAll];
    if (input.type === "checkbox") {
      for (let i = 0; i < tasks.length; i++) {
        let obj = tasks[i];
        if (obj.ID == input.value) {
          obj.isChecked = !obj.isChecked;
        }
        this.setState({ taskAll: tasks });
      }
    }
  };

  handleChangeAll = (e) => {
    const { currentTarget: input } = e;
    const tasks = [...this.state.taskAll];
    var { selectAll } = this.state;
    //  selectAll = !selectAll;
    console.log(selectAll);
    for (let i = 0; i < tasks.length; i++) {
      let obj = tasks[i];
      obj.isChecked = selectAll == true ? true : false;
    }
    this.setState({ taskAll: tasks, selectAll: !selectAll });
  };

  handleComplete = async () => {
    let tasks = [...this.state.taskAll];
    // console.log("tasks");

    let result = tasks.filter((obj) => obj.isChecked === true);
    //console.log(result);
    var strID = "";
    if (result !== undefined && result.length > 0) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        strID += i !== result.length - 1 ? result[i].ID + "," : result[i].ID;
      }
      var obj = { id: strID, status: "Completed" };
      //console.log(obj);
      let apiEndPoint = "https://maxifysales.com:5000/api/tasks/taskStatus/35";
      //console.log("Complete");
      let { data: taskAll } = await axios.put(apiEndPoint, obj);
      this.setState({ taskAll, completeFlag: true });
    }
  };

  handleDelete = async (navObj) => {
    console.log(navObj);
    let apiEndPoint = "https://maxifysales.com:5000/api/tasks/taskDeactive/35";
    var str = "";
      for (let i = 0; i < navObj.length; i++) {
        str += i !== navObj.length - 1 ? navObj[i].ID + "," : navObj[i].ID;
      }
      let obj = { id: str, isactive: 0 };
       let { data: taskActive } = await axios.put(apiEndPoint, obj);
       this.setState({ deleteFlag: true,taskActive });
  };

  render() {
    let task = this.getArrayToRender();
    let { selectAll } = this.state;
    var navObj;
    if (task !== undefined) {
      navObj = task.filter((t1) => t1.isChecked === true);
      //console.log(navObj);
    }
    return (
      <>
        {navObj !== undefined && navObj.length > 0 && (
          <div className="fixed-top sticky">
            <div className="row">
              <div className="col-11 text-primary">
                <input
                  type="checkbox"
                  value={task.isChecked}
                  onChange={this.handleChangeAll}
                  name="isChecked"
                  id={task.isChecked}
                  checked={task.isChecked}
                  // className="ml-2"
                />
                {selectAll ? (
                  <label htmlFor="isChecked" className="ml-3">
                    SELECT ALL
                  </label>
                ) : (
                  <label htmlFor="isChecked" className="ml-3">
                    DESELECT ALL
                  </label>
                )}
              </div>
              <div className="mr-3">
                <span
                  className="titleComplete"
                  data-toggle="modal"
                  data-target="#completeModal"
                >
                  {/* <i
                    className="fa fa-check"
                    aria-hidden="true"
                    onClick={() => {
                      this.handleComplete();
                    }}
                  ></i> */}
                  <i className="fa fa-check" aria-hidden="true"></i>
                  <span className="textComplete">Complete</span>
                </span>
              </div>
              <div className="mr-3">
                <span
                  className="titleDelete"
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  {/* <i
                    className="fa fa-trash"
                    onClick={() => {
                      this.handleDelete();
                    }}
                  ></i> */}
                  <i className="fa fa-trash"></i>
                  <span className="textDelete">Delete</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* <-------------------------- modal for complete --------------------------> */}

        <div
          className="modal fade"
          id="completeModal"
          tabIndex="-1"
          // role="dialog"
          aria-labelledby="completeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="completeModalLabel">
                  Are you sure?
                </h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                All selected tasks will be marked as completed!
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleComplete()}
                  data-dismiss="modal"
                >
                  I'M SURE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <-------------------------- modal for delete --------------------------> */}

        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          // role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Warning!
                </h5>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                You are about to delete task. Are you sure you want to do this?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-dismiss="modal">
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleDelete(navObj)}
                  data-dismiss="modal"
                >
                  I'M SURE
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card fixed-top listTask ml-2">
          {task !== undefined && (
            <div className="row font-weight-bold">
              <div className="col-1 text-primary">##</div>
              <div
                className="col-1 text-primary"
                onClick={() => {
                  this.handleSort(1);
                }}
              >
                Task
              </div>
              <div className="col-1 text-primary">Contact</div>
              <div className="col-2 text-primary">Notes</div>

              <div
                className="col-1 text-primary"
                onClick={() => {
                  this.handleSort(2);
                }}
              >
                Created By
              </div>
              <div
                className="col-1 text-primary"
                onClick={() => {
                  this.handleSort(3);
                }}
              >
                Agent
              </div>
              <div
                className="col-1 text-primary"
                onClick={() => {
                  this.handleSort(4);
                }}
              >
                Date Created
              </div>
              <div className="col-4">
                <div className="row">
                  <div
                    className="col-5 text-primary"
                    onClick={() => {
                      this.handleSort(5);
                    }}
                  >
                    Due Date
                  </div>
                  <div
                    className="col-3 text-primary"
                    onClick={() => {
                      this.handleSort(6);
                    }}
                  >
                    Status
                  </div>
                  <div className="col-2 text-primary">
                    <div className="row">Action</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {task !== undefined &&
          task.map((d1, ind) => (
            <div className="col-12 list">
              <div className="row" key={d1.ID}>
                <div className="col-1">
                  <input
                    type="checkbox"
                    value={d1.ID}
                    onChange={this.handleChange}
                    name="isChecked"
                    id={d1.ID}
                    checked={d1.isChecked}
                  />
                </div>
                <div className="col-1">{d1.TASK}</div>
                {d1.CONTACTS_FIRSTNAME !== null &&
                  d1.CONTACTS_LASTNAME !== null && (
                    <div className="col-1 text-primary">
                      {d1.CONTACTS_FIRSTNAME} {d1.CONTACTS_LASTNAME}
                    </div>
                  )}
                {d1.CONTACTS_FIRSTNAME === null &&
                  d1.CONTACTS_LASTNAME === null && (
                    <div className="col-1 text-primary">--</div>
                  )}
                <div className="col-2">{d1.NOTES}</div>
                <div className="col-1">{d1.FIRSTNAME}</div>
                <div className="col-1">{d1.FIRSTNAME}</div>
                <div className="col-1">
                  {d1.CREATED_DATE} {d1.CREATED_TIME}
                </div>
                <div className="col-4">
                  {d1.STATUS !== "Completed" && (
                    <div className="row">
                      <div className="col-5 text-danger">
                        {d1.EXPECTED_DATE} {d1.DUE_TIME}
                      </div>
                      <div className="col-3">{d1.STATUS}</div>
                      <div className="col-2">
                        <span>
                          <i className="fa fa-edit"></i>
                        </span>
                        <span className="text-primary">
                          Stop Repeated Notify
                        </span>
                      </div>
                    </div>
                  )}
                  {d1.STATUS === "Completed" && (
                    <div className="row">
                      <div className="col-5">NA</div>
                      <div className="col-3">
                        {" "}
                        {d1.EXPECTED_DATE} {d1.DUE_TIME}
                      </div>
                      <div className="col-2">
                        <span>
                          <i className="fa fa-edit"></i>
                        </span>
                        <span className="text-success font-weight-bold">
                          Completed
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
}

export default ListTask;
