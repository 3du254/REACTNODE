import React, { Component } from "react";
import Breadcumps from "../../breadcumps";
import Table from "../../Table";
import TableWrapper from "../../TableWrappper";
import Wrapper from "../../wrapper";
import swal from "sweetalert";

class ClaimsDocumentTypes extends Component {
  constructor() {
    super();
    this.state = {
      ClaimsDocumentTypes: [],
      Code: "",
      DocumentName: ""
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
      CostCenter: "001",
      AgentCode: "A001",
      AgentName: "steve",
      AgentAddress: "Nairobi",
      City: "Nairobi",
      Telephone: "0",
      Mobile: "0",
      Email: "email@email.com",
      Occupation: "Occupation",
      ContactPerson: "0",
      Group: "0"
    });
  }
  fetchData = () => {
    fetch("api/ClaimsDocumentTypes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(ClaimsDocumentTypes => {
        if (ClaimsDocumentTypes.length > 0) {
          this.setState({ ClaimsDocumentTypes });
        } else {
          swal("Oops!", ClaimsDocumentTypes.message, "error");
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
    this.setState({ [actionMeta.name]: County.value });
  };

  handleDelete = ClaimsDocumentTypes => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this record?",
      icon: "warning",
      dangerMode: false
    }).then(willDelete => {
      if (willDelete) {
        //console.log(ClaimsCategories.Code);
        return fetch("api/ClaimsDocumentTypes/" + ClaimsDocumentTypes.Code, {
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
  handleEdit = ClaimsDocumentTypes => {
    const data = {
      ClaimsDocumentTypes: [],
      Code: ClaimsDocumentTypes.Code,
      DocumentName: ClaimsDocumentTypes.DocumentName
    };
    this.setState(data);
    this.setState({ reseter: true });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = {
      Code: this.state.Code,
      DocumentName: this.state.DocumentName
    };
    //console.log(data);
    this.postData("api/ClaimsDocumentTypes", data);
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
    // this.fetchCounty();
    /// this.fetchCurrency();
    // this.fetchCountries();
  }

  render() {
    const ColumnData = [
      {
        label: "Code",
        field: "Code",
        sort: "asc",
        width: 250
      },
      {
        label: "DocumentName",
        field: "DocumentName",
        sort: "asc",
        width: 200
      }
    ];
    let Rowdata1 = [];
    const Rows = [...this.state.ClaimsDocumentTypes];

    if (Rows.length > 0) {
      Rows.map((Row, i) => {
        let Rowdata = {
          Code: Row.Code,
          DocumentName: Row.DocumentName,
          action: (
            <span>
              {" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleEdit(Row, e)}
              >
                Edit
              </a>
              |{" "}
              <a
                style={{ color: "#007bff" }}
                onClick={e => this.handleDelete(Row, e)}
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
            tablename={"Add Claims Document Types"}
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
            tablename={"Claims Document Types list"}
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
                    <label htmlFor="Code">ClaimsDocumentTypes Code</label>
                    <input
                      type="text"
                      name="Code"
                      value={props.Values.Code}
                      onChange={props.handleInputChange}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter ClaimsDocumentTypes Code"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="DocumentName">
                      ClaimsDocumentTypes Name
                    </label>
                    <input
                      type="text"
                      name="DocumentName"
                      required
                      value={props.Values.DocumentName}
                      className="form-control"
                      onChange={props.handleInputChange}
                      id="Name"
                      aria-describedby="CityHelp"
                      placeholder="Enter ClaimsDocumentTypes Name"
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

export default ClaimsDocumentTypes;
