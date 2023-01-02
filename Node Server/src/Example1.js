import React, { useState } from "react";

export default function Example1() {
  const [dong, setDong] = useState("")
  const [data, setData] = useState({
    code: 0, 
    dong: "",
    gu: "", 
    lat: 0,
    lng: 0,
    sido: ""
  }) 

  const onChange = (e) => {
    setDong(e.target.value)
  }
  const onClick = () => {
    fetch(`http://localhost:3001/info/${dong}`, {
      method: "get", //통신방법
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json()) 
      .then((data) => setData(data))
  }
  return (
    <div>
      <input name="text" onChange={onChange}></input>
      <button onClick={onClick}>전송</button>
      <h3>{dong}</h3>
      <h2>{data}</h2>
    </div>
  )
}