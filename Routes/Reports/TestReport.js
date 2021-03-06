module.exports = ({ name, price1, price2, receiptId }) => {
  const today = new Date();
  return `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>PDF Result Template</title>
    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 12px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica";
        color: #555;
      }

      .margin-top {
        margin-top: 50px;
      }

      .justify-center {
        text-align: center;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }
      .invoice-box table tr.item table td {
        font-size: 12px;
        padding: 0;
        margin: 0;
        border-bottom: none;
      }
      
      .invoice-box table tr.item td {
        border-bottom: 1px solid #ccc;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    </style>
  </head>

  <body>
    <div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2" style="text-align: center">
            <img
              src="http://www.allicom.co.ke/images/ALLICOM.png"
              style="width:100%; max-width:156px;"
            />
          </td>
        </tr>
        <tr class="information">
          <td colspan="2">
            <table>
              <tr>                
                <td style="font-size: 16px"><strong>INVOICE</strong></td>
                <td>
                  SN: 001
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="item">
          <td>ACCOUNT</td>
          <td>
            <table>
              <tr>
                <td>C001</td>
                <td>
                  DATE: 2019-08-07
                </td>
              </tr>
              <tr>
                <td>KEMBOI EDWIN</td>
                <td>
                  POLICY NO: PL/2019/001
                </td>
              </tr>
              <tr>
                <td>P.O. BOX 2124-30200</td>
                <td>
                  OUR REF: 001
                </td>
              </tr>
              <tr>
                <td>NAIROBI</td>
                <td>
                  TYPE: NEW
                </td>
              </tr>
              <tr>
                <td>Email: kemboi.edwin555@gmail.com</td>
                <td>
                  MOBILE: +254724554175
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="item">
          <td>INSURED</td>
          <td>
            <table>
              <tr>
                <td>KEMBOI EDWIN</td>
                <td>
                  PIN NO: A00T7989J
                </td>
              </tr>
              <tr>
                <td>OCCUPATION: Developer</td>
                <td>
                  IDNO: 32145131
                </td>
              </tr>
              <tr>
                <td>NAIROBI</td>
                <td>
                  TYPE: NEW
                </td>
              </tr>
              <tr>
                <td>Email: kemboi.edwin555.gmail.com</td>
                <td>
                  MOBILE: +254724554175
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="item">
          <td>RISK COVERED</td>
          <td>
            <table>
              <tr>
                <td>ITEM 100</td>
                <td>
                  <strong>FROM</strong> 2019-01-01
                  <strong>TO</strong> 2019-01-31
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="item">
          <td>INTEREST AND SUM INSURED</td>
          <td>
            INTEREST AND SUM INSURED OF ITEM 100
          </td>
        </tr>
        <tr class="item">
          <td><strong>DUE PREMIUM</strong></td>
          <td>
            <table>
              <tr>
                <td>100000</td>
                <td>
                  <i>Premium Figures in KSHS (Kenya Shillings)</i>
                </td>
                <td style="color: red">COPY TYPE</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr class="item">
          <td>INSURER</td>
          <td style="text-align: left">
            COMPANY-001
          </td>
        </tr>
      </table>

      <br />
      <table>
        <tr>
          <td>PREPARED BY: Steve Mutunga</td>
          <td>COSTCENTER</td>
          <td>Authorised By :: Steve Mutunga</td>
        </tr>
        <tr>
          <td colspan="3" style="text-align: center">
            Accounts Due on Demand.
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

    `;
};
