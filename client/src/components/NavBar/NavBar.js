import React, {useContext} from 'react';
import {Context} from "../../index";
import {Container, Navbar, Nav, Button, DropdownButton, Dropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../../utils/consts';


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(SHOP_ROUTE)
    }

    return (
        <Navbar data-bs-theme="dark"  expand="lg" className="bg-body-tertiary p-2">
            <Container fluid>
                <Navbar.Brand href='http://localhost:3000/shop'>Технологичный мир</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ?
                        <Nav
                            className="ms-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {/*<Button variant={"light"} className="me-2" onClick={logOut}>Выйти</Button>*/}
                            {/*<Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>*/}
                            <DropdownButton
                                align="end"
                                title="Личный кабинет "
                                id="dropdown-menu-align-end"
                                variant="light"
                            >
                                <Dropdown.Item eventKey="1">Настройки</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE)} eventKey="2">Админ панель</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logOut} eventKey="4">Выйти</Dropdown.Item>
                            </DropdownButton>
                        </Nav>
                        :
                        <Nav
                            className="ms-auto"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Button onClick={() => navigate(LOGIN_ROUTE)} variant={"light"} className="me-3">Войти</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;