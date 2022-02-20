import React from 'react'
import {Button,message,Input} from "antd"
const FillData = ({email}) => {
    const [show,setShow]=React.useState(false);
    const [amount,setAmount]=React.useState(0);
  const onSubmit = (event) => {
    event.preventDefault();
    fetch("/tax-accountant/register", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        taxPayerId: email,
        taxableAmount:amount
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          
        } else {
          throw new Error(res.error);
        }
        return res.json();
      })
      .then((res) => {
           message.succesful("data Updated refresh page to check");
      })
     
  };
  return (
    <>
      {show == false ? (
        <Button onClick={()=>setShow(true)}>FillData</Button>
      ) : (
        <form >
          <Input
            placeholder="enter income"
            onChange={(e) => setAmount(e.target.value)}
          />{" "}
          <Button onClick={onSubmit}>Submit</Button>
        </form>
      )}
    </>
  );
}

export default FillData