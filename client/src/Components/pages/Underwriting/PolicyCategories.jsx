import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
class PolicyCategories extends Component {
  constructor() {
    super();
    this.state = {
      reseter: false,
      PolicyCategories: [],

      Name: "",
      Code: "",
      Advancemotorins: false
    };
  }
  handleclick = e => {
    e.preventDefault();
    if (this.state.reseter === false) {
      this.setState({ reseter: true });
    } else {
      this.setState({ reseter: false });
    }
  };
  handleDelete = k => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        return fetch("api/PolicyCategories/" + k, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.json().then(data => {
              if (data.success) {
                swal("Deleted!", "Record has been deleted!", "success");
              } else {
                swal("error!", data.message, "error");
              }
              this.fetchData();
            })
          )
          .catch(err => {
            swal("Oops!", err.message, "error");
          });
      }
    });
  };
  handleEdit = PolicyCategory => {
    const data = {
      Name: PolicyCategory.Name,
      Code: PolicyCategory.Code
    };
  
    this.setState(data);
    this.setState({ reseter: true });
  };

  fetchData = () => {
    fetch("api/PolicyCategories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(PolicyCategories => {
        if (PolicyCategories.length > 0) {
          this.setState({ PolicyCategories: PolicyCategories });
        } else {
          swal("Oops!", PolicyCategories.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
        swal("Oops!, data.message, error");
      });
  };
  //end

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Name: this.state.Name,
      Code: this.state.Code,
      Advancemotorins: this.state.Advancemotorins
    };

    this.postData("api/PolicyCategories", data);
  };

  //   handleInputChange = event => {
  //     event.preventDefault();
  //     this.setState({ [event.target.name]: event.target.value });
  //   };

  handleInputChange = event => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };
  postData(url = ``, data = {}) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response =>
        response.json().then(data => {
          this.fetchData();

          if (data.success) {
            swal("Saved!", "Record has been saved!", "success");
          } else {
            swal("Saved!", data.message, "error");
          }
        })
      )
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const ColumnData = [
      {
        label: "Code",
        field: "Code",
        sort: "asc",
        width: 270
      },
      {
        label: "Narration",
        field: "Narration",
        sort: "asc",
        width: 250
      },
      {
        label: "Advancemotorins",
        field: "Advancemotorins"
      },
      {
        label: "action",
        field: "action",
        sort: "asc",
        width: 200
      }
    ];

    const Rowdata1 = [];
    const rows = [...this.state.PolicyCategories];
    if (rows.length > 0) {
      rows.map((k, i) => {
        const Rowdata = {
          Code: k.Code,
          Name: k.Name,
          Advancemotorins: k.Advancemotorins.toString(),
          action: (
            <span>
              {" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleEdit(k, e)}
              >
                Edit
              </a>
              |{" "}
              <a
                style={{ color: "#f44542" }}
                onClick={e => this.handleDelete(k.Code, e)}
              >
                {" "}
                Delete
              </a>
            </span>
          )
        };
        Rowdata1.push(Rowdata);
      });
    }
    if (this.state.reseter) {
      return (
        <div>
          <Breadcumps
            tablename={"PolicyCategories"}
            button={
              <button
                to="/"
                type="button"
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className="btn btn-primary float-left"
              >
                Go Back
              </button>
            }
          />

          <Formdata
            Values={this.state}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"PolicyCategories"}
            button={
              <button
                to="/"
                type="button"
                style={{ marginTop: 40 }}
                onClick={this.handleclick}
                className="btn btn-primary float-left"
              >
                Create New
              </button>
            }
          />

          <TableWrapper>
            <Table Rows={Rowdata1} columns={ColumnData} />
          </TableWrapper>
        </div>
      );
    }
  }
}
const Formdata = props => {
  return (
    <div className="container-fluid">
      <div className="col-sm-12">
        <div className="ibox ">
          <div className="ibox-title">
            <div className="ibox-tools">
              <a className="close-link">
                <i className="fa fa-times" />
              </a>
            </div>
          </div>
          <div className="ibox-content">
            <form onSubmit={props.handleSubmit}>
              <div className=" row">
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Code </label>
                    <input
                      value={props.Values.Code}
                      type="text"
                      name="Code"
                      // value={props.Values.Narration}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="RoCodele"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <textarea
                      value={props.Values.Name}
                      type="text"
                      name="Name"
                      // value={props.Values.Narration}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="checkbox">
                    <input
                      id="checkbox1"
                      type="checkbox"
                      name="Advancemotorins"
                      onChange={props.handleInputChange}
                      checked={props.Values.Advancemotorins}
                    />
                    <label htmlFor="checkbox1">Advance Motor Insurance</label>
                  </div>
                  <div className="form-group ">
                    <br />

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ margintop: 50 }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PolicyCategories;
