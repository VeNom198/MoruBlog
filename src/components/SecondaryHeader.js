import React from "react";

const SecondaryHeader = () => {
  return (
    <nav className="menuBar2" style={{ backgroundColor: "#c70039" }}>
      <div className="Webcontainer2">
        <div
          style={{
            display: "flex",
            marginLeft: "6px",
            justifyContent: "space-between",
          }}
        >
          <div className="PhoneNo">
            {/* <div className="textColor">
              <PhoneOutlined style={{ marginTop: "-9px" }} />
              16600114888
            </div> */}
            <div className="textColor">
              <i className="fa fa-phone" aria-hidden="true"></i>
              +977 9801035348
            </div>
          </div>
          <div className="textColor">
            <strong>अब डिजिटल जीवन सुरु</strong>
          </div>
          <div className="PhoneNo">
            <div className="textColor">
              <i className="fas fa-envelope"></i> info@moru.com.np
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default SecondaryHeader;
