import { Result, Button, Col, Row, Card } from "antd";
import history from "../history";
import Logoh from "./h.png";
import Logot from "./t.png";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleFilled,
  EnvironmentOutlined,
  EditOutlined,
  PhoneOutlined,
  StopOutlined,
} from "@ant-design/icons";

import styled, { css } from "styled-components";

const H1 = styled.h1`
  font-weight: 500;
  text-align: start;
`;
const Support = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          
          alignItems: "center",
          backgroundColor:'#66ffff'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,208C672,235,768,245,864,218.7C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        {/* <Card hoverable style={{ width: "50%", textAlign: "center" }}> */}
          <img
            src={Logoh}
            alt=""
            width="250px"
            style={{ cursor: "pointer", padding: "5px" }}
            onClick={() => history.push("/")}
          />
          <div
            style={{
              display: "flex",
              fontWeight:'500',
              
              justifyContent: "center",
              backgroundColor: "#fff",
              alignItems: "center",
              backgroundColor:'#66ffff',
              color:'#fff',
              
            }}
          >

            <Card
            hoverable
              style={{
                margin: "20px",
                textAlign:'center',
                backgroundColor:'#66ffff',
              
                
               
              }}
            >
              <div style={{ color: "red" }}>
                <EnvironmentOutlined />
              </div>

              <h2>Visit us</h2>
              <p> Visit our office to get more information.</p>
              <p> We are always happy to help </p>
              <h3> <EnvironmentOutlined /> 
              KA-86,Pragati Sharani Road</h3>
              <h3> Kuril,Dhaka 1229</h3>
             
            </Card><br></br>
            <Card
            hoverable
              style={{
                margin: "20px",
                textAlign:'center',
                backgroundColor:'#66ffff',
                marginLeft:'500px',
                
              }}
            >
              <div style={{ color: "red" }}>
                <PhoneOutlined />
              </div>
              <h2>Contact us</h2>
              <p>Call us to speak to a member of our team.</p>
              <p>We are always happy to help</p>
              <h3 > <PhoneOutlined /> +88 096133848484</h3>
              <h3>.</h3>
            </Card>
          </div>
        {/* </Card> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,208C672,235,768,245,864,218.7C960,192,1056,128,1152,117.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>
    </>
  );
};

export default Support;
