import { Button } from "antd";
import React from "react";

import styled from "styled-components";
import history from "../history";

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
const handlePage=async()=>{
  history.push(`/dashboard`);
}

const notFound = () => {
  return (
    <>
      <Bar>
        <div className="logo">
          <a href="https://hidayahsmart.solutions/" target="_blank" rel="noreferrer">
            <img src="/B1.png" alt="bahonLogo" width="120" height="50" />
          </a>
        </div>

        <div className="tracker">
          <h1 style={{ color: "#635f5e" }}>Not Found Admin Panel</h1>
        </div>
      </Bar>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        {" "}
        <img src="/nothing.gif" alt="img" width="250" />{" "}
        
      </div>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>
      Not Found Page
      
      </h1>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Button onClick={() => handlePage()} >Dashboard</Button>
        
      </div>
      
    </>
  );
};

export default notFound;
