import React, { Component } from "react";
import swal from "sweetalert";
import { type } from "os";
import { saveAs } from "file-saver";
class report extends Component {
  state = {
    name: "Adrian",
    receiptId: 0,
    price1: 0,
    price2: 0
  };

  fetchData = () => {
    fetch("api/company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(company => {
        if (company.length > 0) {
          this.setState({ company: company });
        } else {
          swal("Oops!", company.message, "error");
        }
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };
  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });
  createAndDownloadPdf = () => {
    return fetch("/api/reports/create-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(this.state)
    })
      .then(() =>
        fetch("/api/reports/fetch-pdf", {
          method: "GET",
          headers: {
            Accept: "application/pdf"
          },
          responseType: "blob"
        })
      )
      .then(res => {
        if (res.ok) {
          return res.blob();
        }
      })
      .then(blob => {
        saveAs(blob, "TestInvoice.pdf");
      })
      .catch(err => {
        swal("Oops!", err.message, "error");
      });
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="Appq">
        <button onClick={this.createAndDownloadPdf}>Download Invoice</button>
      </div>
    );
  }
}

export default report;
