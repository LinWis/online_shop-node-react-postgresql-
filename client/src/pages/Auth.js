import React, { useContext, useState } from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import { registration, login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer (() => {

    let {user} = useContext(Context)

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const authorization = async () => {
        let response;
        try {
            if (!isLogin) {
                response = await registration(email, password, 'ADMIN');
            }
            else {
                response = await login(email, password);
            }

            user.setUser(user);
            user.setIsAuth(true)

            navigate(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        } 
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 70}}>
            <Card style={{width: 600}} className="p-5">

                <h3 className="m-auto">{isLogin ? "Авторизация" : "Регистрция"}</h3>

                {isLogin ? 
                    <Form className="d-flex flex-column">
                        <Form.Control
                            placeholder="Введите ваш email ..."
                            className="mt-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Form.Control
                            placeholder="Введите ваш пароль ..."
                            className="mt-2"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="d-flex justify-content-between mt-3">
                            <div className="d-flex flex-row">
                                Нет аккаунта?<NavLink onClick={() => navigate(REGISTRATION_ROUTE)} className="ms-1" style={{color: "blue"}} to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            <Button onClick={authorization} variant="outline-success">Войти</Button>
                        </div>

                    </Form>
                : 
                    <Form className="d-flex flex-column">
                        <Form.Control
                            placeholder="Введите ваш email ..."
                            className="mt-2"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Form.Control
                            placeholder="Введите ваш пароль ..."
                            className="mt-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div className="d-flex justify-content-between mt-3">
                            <div className="d-flex flex-row">
                                Есть аккаунт?<NavLink onClick={() => navigate(REGISTRATION_ROUTE)} className="ms-1" style={{color: "blue"}} to={REGISTRATION_ROUTE}>Войдите!</NavLink>
                            </div>
                            <Button onClick={authorization} variant="outline-success">Регистрция</Button>
                        </div>

                    </Form>
                }
            </Card>

        </Container>
    );
});

export default Auth;