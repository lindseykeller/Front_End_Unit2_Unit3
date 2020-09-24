import React, { useState } from "react";
import axios from "axios";
import *as yup from 'yup'
import { GlobalContext } from "../context/GlobalContext";
import styled from 'styled-components'

const Group = styled.div`
display:block`

export default function AuthForm({ role, history }) {
  const { setLoggedIn } = React.useContext(GlobalContext);

  const [authInfo, setAuthInfo] = useState({
    username: "",
    password: "",
  });
//needed to change userName to username

  const[errors,setErrors] = useState({

    username:'',
    password:'',
    message:''
})

const logFormSchema = yup.object().shape({
    userName: yup.string().required('must enter user name'),
    password: yup.string().required('must enter password')
})


  const handleChange = (e) => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://better-professor-build-week.herokuapp.com/auth/login`,
        authInfo
      )
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        localStorage.setItem("token", res.data.token);
        history.push("/howtos");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="auth-page">
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>

        <Group>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userInfo.username}
            onChange={handleChange}
          />
        </Group>
        <Group>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
          {/* {errors.message.length>0?<p className= 'error'>{errors.message}</p>:null} */}
        </Group>

        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

