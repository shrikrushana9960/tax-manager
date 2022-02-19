import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./payment.css"
import { Button, Form, Input, message, Typography, Select } from "antd";
import {
  UserOutlined,
  CarryOutOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import CustomLayout from "../components/CustomLayout";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "../actions/actions";

const { Title } = Typography;

const Payment = ({ history }) => {
  const { Option } = Select;
  const [email, setLocalEmail] = useState("");
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [liveState, useliveState] = "";

  const dispatch = useDispatch();
  React.useEffect(()=>{
    let formInputs = [
      {
        inputObject: document.querySelector("#card_no_input"),
        targetObject: document.querySelector("#card_no"),
        regex: /^[(0-9\s{19})]+$/i,
      },
      {
        inputObject: document.querySelector("#card_name_input"),
        targetObject: document.querySelector("#card_name"),
        regex: /^[A-Z\s]+$/i,
      },
      {
        inputObject: document.querySelector("#card_expiry_date_input"),
        targetObject: document.querySelector("#card_expiry_date"),
        regex: /(^0[1-9]|1[0-2]+)\/([2-9]{1}[0-9]{1})/,
      },
      {
        inputObject: document.querySelector("#card_cvv_input"),
        targetObject: document.querySelector("#card_cvv"),
        regex: /^[0-9]{3,4}$/,
      },
    ];

    let cardBody = document.getElementById("credit-card-body");

    formInputs.forEach((obj) => {
      console.log(obj);
      obj.inputObject.addEventListener("input", (e) => {
        if (obj.regex.test(e.target.value)) {
          if (e.target.id === "card_no_input") {
            e.target.value = e.target.value
              .replace(/[^\d]/g, "")
              .replace(/(.{4})/g, "$1 ")
              .trim();
          }

          obj.targetObject.textContent = e.target.value.trim();
          e.target.classList.remove("error");
        } else {
          if (e.target.value === "") e.target.classList.remove("error");
          else e.target.classList.add("error");
        }
      });
    });
    formInputs[3].inputObject.addEventListener("focus", () => {
      cardBody.classList.add("flip");
    });
    formInputs[3].inputObject.addEventListener("blur", () => {
      cardBody.classList.remove("flip");
    });

  },[])
  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ email, name, pan, liveState }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/adminboard");
        } else {
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
        dispatch(setName(res.name));
        dispatch(setEmail(email));
      })
      .catch((err) => {
        console.error(err);
        message.error("Error in register please try again");
      });
  };

  return (
   
      <div class="parent">
        <div class="child">
          <div class="container">
            <div id="credit-card">
              <div id="credit-card-body">
                <div id="card-front">
                  <img
                    src="https://lh3.googleusercontent.com/pw/ACtC-3dNXbc3zr0sdNzg3aXh5XQ5ndp9wn_DabZeBltQT0nEF98vnj0hitZwU7mq-5Nlh1hBrjsHmwpzWuU8Yn8sGDLVOdUa6P0plMG51fNeXNRxFUvChgazOq4ZtCIU6DBQ1VkCG6na4MoTkiUC8mhl6lDL=w110-h30-no"
                    alt="visa card"
                    class="card-logo"
                  />
                  <div class="card-chip">
                    <div class="component-1"></div>
                    <div class="component-2"></div>
                    <div class="component-3"></div>
                    <div class="component-4"></div>
                    <div class="component-5"></div>
                  </div>
                  <div id="card_no"></div>
                  <div class="card-labels card-holder-label">Card Holder</div>
                  <div class="card-labels">Expires</div>
                  <div id="card_name"></div>
                  <div id="card_expiry_date"></div>
                </div>
                <div id="card-back">
                  <div id="magnetic_stripe"></div>
                  <div id="signature"></div>
                  <div id="card_cvv"></div>
                  <div id="disclaimer">
                    Sed augue lacus viverra vitae congue eu consequat ac felis.
                    Quam quisque id diam vel. Quis risus sed vulputate odio ut
                    enim blandit. Viverra justo nec ultrices dui sapien eget mi
                    proin sed. Amet justo donec enim diam vulputate. Vestibulum
                    morbi blandit cursus risus at ultrices mi. Condimentum vitae
                    sapien pellentesque habitant. Leo duis ut diam quam. Cras
                    sed felis eget velit aliquet sagittis. Viverra vitae congue
                    eu consequat ac felis donec et. Hendrerit gravida rutrum
                    quisque non tellus orci ac.
                  </div>
                </div>
              </div>
            </div>
            <form action="" id="credit-card-form">
              <div class="form-group">
                <label for="card_no_input">Card No.</label>
                <input type="text" id="card_no_input" maxlength="19" />
                <label for="card_name_input">Name</label>
                <input type="text" id="card_name_input" maxlength="20" />
                <label for="card_expiry_date_input">Expiry Date</label>
                <input type="text" id="card_expiry_date_input" maxlength="5" />
                <label for="card_cvv_input">CVC</label>
                <input type="text" id="card_cvv_input" />
              </div>
              <button>Pay</button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default Payment;
