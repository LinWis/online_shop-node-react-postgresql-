import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from "../assets/bigStar.png"
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/DeviceAPI';

const DevicePage = () => {

    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4} className='d-flex flex-column align-items-center justify-content-center'>
                    <Image src={process.env.REACT_APP_API_URL + device.img} width={250} height={300}/>
                </Col>

                <Col md={4} className='d-flex flex-column align-items-center justify-content-center'>
                    <Row className='d-flex flex-column align-items-center justify-content-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{background: `url(${bigStar}) no-repeat center center`,
                            width: "240px", height: "240px", backgroundSize: "cover", fontSize: 64}}
                        >
                            {device.rating}

                        </div>
                    </Row>
                </Col>

                <Col md={4} className='d-flex flex-column align-items-center justify-content-center'>
                    <Card className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: "300px", height: "300px", fontSize: 32, border: "5px solid lightgray"}}
                    >
                        <h3>{device.price}</h3>
                        <Button variant='outline-dark'>Добавить корзину</Button>
                    </Card>
                </Col>
            </Row>

            <Row className='d-flex flex-column mt-5'>
                <h1>Характеристики</h1>
                {device.info.map((item, index) => (
                    <Row className='p-3' key={item.id} style={{background: index % 2 === 0 ? "lightgray" : "transparent", fontSize: 18}}>
                        {item.title}: {item.description}
                    </Row>
                ))}
            </Row>

        </Container>
    );
};

export default DevicePage;