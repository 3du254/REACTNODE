import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";
import Select from "react-select";

class ClaimOtherDetails extends Component {
  constructor() {
    super();
    this.state = {
      ClaimOtherDetails: [],
      ClaimsTypeCode: [],
      Description: "",

      Code: "",
      Name: ""
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
  handleStateReset() {
    this.setState({
      Code: [],
      Description: ""
    });
  }
  fetchClaimsTypeCode = () => {
    fetch("api/ClaimTypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ ClaimsTypeCode: data });
          console.log(data);
        } else {
          swal("Oops!", data.message, "error");
          console.log(data);
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  //end
  fetchData = () => {
    fetch("api/ClaimOtherDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(ClaimOtherDetails => {
        if (ClaimOtherDetails.length > 0) {
          this.setState({ ClaimOtherDetails });
        } else {
          swal("Oops!", ClaimOtherDetails.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  handleInputChange = event => {
    // event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSelectChange = (County, actionMeta) => {
    this.setState({ [actionMeta.name]: County });
    console.log(this.state.Code);
  };

  handleDelete = ClaimOtherDetails => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        //console.log(ClaimOtherDetails.Code);
        return fetch("api/ClaimOtherDetails/" + ClaimOtherDetails.Code, {
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
  handleEdit = ClaimOtherDetails => {
    const data = {
      ClaimOtherDetails: [],
      Code: ClaimOtherDetails.Code,
      Description: ClaimOtherDetails.Description
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Code: this.state.Code.value,
      Description: this.state.Description
    };
    console.log(data);
    this.postData("api/ClaimOtherDetails", data);
    this.setState({ reseter: false });
  };
  postData(url = ``, data = {}) {
    return fetch(url, {
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
            this.handleStateReset();
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
    this.fetchClaimsTypeCode();
  }

  render() {
    const ColumnData = [
      {
        label: "ClaimCode",
        field: "ClaimCode",
        sort: "asc",
        width: 250
      },

      {
        label: "Description",
        field: "Description",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
    const Rows = [...this.state.ClaimOtherDetails];

    if (Rows.length > 0) {
      Rows.map((k, i) => {
        let Rowdata = {
          Code: k.Code,
          Description: k.Description,
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
                style={{ color: "#007bff" }}
                onClick={e => this.handleDelete(k, e)}
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
            tablename={"Add Claim Other Details"}
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
            handleSelectChange={this.handleSelectChange}
            Collections={this.state}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Breadcumps
            tablename={"ClaimOtherDetails list"}
            button={
              <button
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
  const ClaimTypeOptions = [...props.Values.ClaimsTypeCode].map((k, i) => {
    return {
      value: k.TypeCode,
      label: k.TypeName.toString() + k.TypeCode.toString()
    };
  });
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
                    <label htmlFor="DMSDocRef">Claim Type Code</label>
                    <Select
                      name="Code"
                      className="form-group"
                      defaultInputValue={props.Values.Code}
                      value={props.Values.Code}
                      onChange={props.handleSelectChange}
                      options={ClaimTypeOptions}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Description">Description</label>
                    <input
                      type="text"
                      name="Description"
                      required
                      value={props.Values.Description}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="TypeName"
                      aria-describedby="CityHelp"
                      placeholder="Enter Description"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimOtherDetails;
