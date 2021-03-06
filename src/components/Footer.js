import React from "react";
import "./Footer.css";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { ArrowUpOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div className="footer">
      <div style={{ position: "absolute", right: "3%", marginTop: "13px" }}>
        <a href="#">
          <button className="footerBtn">
            <ArrowUpOutlined
              style={{ paddingBottom: "10px", color: "#00a859" }}
            />
          </button>
        </a>
      </div>
      <div className="Webcontainer" style={{ paddingTop: "17px" }}>
        <MDBRow style={{ marginRight: "0px" }}>
          <MDBCol md="3">
            <h5 className="title">Moru Digital wallet</h5>
            <p className="footer-intro" style={{ textAlign: "justify" }}>
              Our mission is to be the leading payment service provider,
              delivering world class service through the blending of
              state-of-the-art technology and visionary management in
              partnership with competent and committed staff, to achieve
              reliable system of services to all with sustainable value addition
              to all our stakeholders.
            </p>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Quick Links</h5>
            <ul>
              <li className="list-unstyled">
                <i className="fab fa-facebook"></i>

                <a href="https://www.facebook.com/ashesh.ranagurung">
                  {" "}
                  facebook
                </a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-instagram"></i>
                <a href="https://www.instagram.com/asheshrana.gr"> Instagram</a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-twitter"></i>
                <a href="https://twitter.com"> Twitter</a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-youtube"></i>
                <a href="https://youtube.com"> Youtube</a>
              </li>
              <li className="list-unstyled">
                <i className="fab fa-linkedin-in"></i>
                <a href="#!"> Linkedin</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Policies</h5>
            <ul>
              <li className="list-unstyled">Terms & Conditions</li>
              <li className="list-unstyled">Privacy Policy</li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">Contact Us</h5>
            <ul>
              <li className="list-unstyled">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                3rd Floor, Nirdhan Bhawan, Bhagwati Bahal, Naxal-1 Kathmandu,
                Nepal
              </li>{" "}
              <li className="list-unstyled">
                <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                +977-1-4543888
              </li>
              <li className="list-unstyled">
                <i className="fa fa-phone" aria-hidden="true"></i>
                16600114888
              </li>
              <li className="list-unstyled">
                {" "}
                <i className="fas fa-envelope-open"></i> info@moru.com.np
              </li>
            </ul>
          </MDBCol>
        </MDBRow>

        <div className="footer-copyright text-center py-3">
          <MDBContainer className="copyright" fluid>
            &copy; {new Date().getFullYear()} Copyright: Pay Nep Pvt. Ltd. | All
            RIghts Reserved
            <br />
            Built with love and{" "}
            <i
              className="fab fa-react"
              style={{
                color: "rgb(71, 189, 189)",
                animation: "rotation 5s infinite linear",
              }}
            ></i>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Footer;
