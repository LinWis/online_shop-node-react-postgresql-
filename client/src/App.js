import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import {auth} from "./http/userAPI"
import { Context } from ".";
import { Spinner } from "react-bootstrap";

const App = observer(() => {

  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).catch(e => {
      console.log(e.response.data.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Spinner animation="grow" />
    )
  }

  return (
    <BrowserRouter className="App">
        <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
