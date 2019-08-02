import React, { Component } from "react";
import swal from "sweetalert";
//var fs = require("fs");
//var pdf = require("html-pdf");
//var pdfTemplate = require("./file");
//var html = fs.readFileSync("./businesscard.html", "utf8");
var options = { format: "Letter" };
class report extends Component {
createPDF(){
  //pdf.create('<html><head><title>REPOET</title></head><body><p>HELLO</p></body></html>', options).toFile('./businesscard.pdf', function (err, res) {
    //if (err) return console.log(err);
    //console.log(res); // { filename: '/app/businesscard.pdf' }
  //});
}
  componentDidMount() {
    //this.fetchData();
  }
  render() {
    return (
      <div>
        <button onClick={this.createPDF}>CREATE</button>
      </div>     
    );
  }
}

export default report;
