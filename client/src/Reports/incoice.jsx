import React, { Component } from "react";
import pdfTemplate from "./TestReport";
//const pdfTemplate= require("./TestReport"); 
var pdf = require("html-pdf");

class report extends Component {
    state = {
        name: "Adrian",
        receiptId: 0,
        price1: 0,
        price2: 0
    };

    
    createAndDownloadPdf = () => {
        pdf.create(pdfTemplate(this.state), {}).toStream((err,stream)=>{
            if (err) {
                console.log(err);
            }
            console.log(stream);
        })//toFile("p.pdf", (err,res) => {
            //if (err) {
                //console.log(err);
            //}
            //console.log(res);
        //});
    };

    componentDidMount() {
       // this.fetchData();
    }
    render() {
        return (
            <div className="Appq">
                <button onClick={this.createAndDownloadPdf}>Download PDF</button>
            </div>
        );
    }
}

export default report;