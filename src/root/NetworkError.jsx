import { Button } from "antd";
import React from "react";

import styled from "styled-components";

const Bar = styled.div`
  position: absotute;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    padding: 5px;
    img {
      width: 70px;
    }
    h1 {
      font-size: 15px;
    }
  }
`;

const NetworkError = () => {
  return (
    <>
      <Bar>
        <div className="logo">
          <a href="https://hidayahsmart.solutions/" target="_blank" rel="noreferrer">
            <img src="/B1.png" alt="bahonLogo" width="120" height="50" />
          </a>
        </div>

        <div className="tracker">
          <h1 style={{ color: "#635f5e" }}>Internet lost</h1>
        </div>
      </Bar>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {" "}
        <img src="/nowifi.png" alt="img" 
       width="250" />{" "}
      </div>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>
     Unable to connect to the Internet
      </h1>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Button >
        <a  href="https://hidayahsmart.solutions/">
        Try Again Sometime

        </a>
       
      </Button>
      </div>
    </>
  );
};

export default NetworkError;
