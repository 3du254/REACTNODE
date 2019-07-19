import React, { Component } from "react";
import { Link } from "react-router-dom";
class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar-default navbar-static-side" role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <img
                    alt="image"
                    className="rounded-circle"
                    src="img/profile_small.jpg"
                  />
                  <a
                    href="/profile"
                    data-toggle="dropdown"
                    className="dropdown-toggle"
                  >
                    <span className="block m-t-xs font-bold">
                      David Williams
                    </span>
                  </a>
                </div>
                <div className="logo-element">IN+</div>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-th-large" />
                  <span className="nav-label ">System Admin</span>
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <Link to="/company">Company</Link>
                  </li>
                  <li>
                    <Link to="/costCenter">Cost Centers</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/usergroups">User Groups</Link>
                  </li>
                  <li>
                    <Link to="/roles">Roles</Link>
                  </li>

                  <li>
                    <Link to="/userroles">User Roles</Link>
                  </li>
                  <li>
                    <Link to="/securitygroups">Security Groups </Link>
                  </li>
                  <li>
                    <Link to="/countries">countries </Link>
                  </li>
                  <li>
                    <Link to="/counties">counties </Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="">
                  <i className="fa fa-bar-chart-o" />{" "}
                  <span className="nav-label">UnderWriting</span>
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <a href="">
                      <span className="nav-label ">Set ups</span>
                      <span className="fa arrow" />
                    </a>
                    <ul className="nav nav-second-level collapse">
                      <li>
                        <Link to="/PolicyCategories">Policy Categories </Link>
                      </li>
                      <li>
                        <Link to="/Insurer">Insurance Companies</Link>
                      </li>
                      <li>
                        <Link to="/department">Department</Link>
                      </li>
                      <li>
                        <Link to="/calcitems">Premium calc items</Link>
                      </li>
                      <li>
                        <Link to="/PolicyClasses">Policy Classes</Link>
                      </li>
                      <li>
                        <Link to="/PaymentModes">Modes of Payment</Link>
                      </li>

                      <li>
                        <Link to="/vehiclemake">Vehicle Make</Link>
                      </li>
                      <li>
                        <Link to="/clientcategory">Client Category</Link>
                      </li>
                      <li>
                        <Link to="/FamilyDependant"> Dependants</Link>
                      </li>
                      <li>
                        <Link to="/damagedcerts"> Damaged certificates</Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="/clients">Clients</Link>
                  </li>
                  <li>
                    <Link to="/agents">Agents</Link>
                  </li>
                  <li>
                    <Link to="/motorvehicles">Motor Vehicles</Link>
                  </li>
                  <li>
                    <Link to="/premiumCalculator">Premium Calculator</Link>
                  </li>

                  <li>
                    <Link to="/FamilyMember">Family Members</Link>
                  </li>
                  <li>
                    <Link to="/policyregister">Policy Register</Link>
                  </li>
                  <li>
                    <Link to="/InsuredItems"> Insured Items</Link>
                  </li>
                  <li>
                    <Link to="/CoInsurance"> Co Insurance</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="">
                  <i className="fa fa-list-alt" />
                  <span className="nav-label ">Claims</span>
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <Link to="/ClaimsCategories">Claims Categories</Link>
                    <Link to="/ClaimsDocumentTypes">Claims Document Types</Link>
                    <Link to="/ClaimType">Claims Types</Link>
                    <Link to="/ClaimOtherDetails">Claim Other Details</Link>
                  </li>
                </ul>
              </li>

              <li>
                <a href="">
                  <i className="fa fa-th-large" />
                  <span className="nav-label ">Certificates</span>
                  <span className="fa arrow" />
                </a>
                <ul className="nav nav-second-level collapse">
                  <li>
                    <Link to="/ReceiveMotorCertificates">
                      Receive Motor Certificates
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
