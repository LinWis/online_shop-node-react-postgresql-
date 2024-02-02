import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import star from '../../assets/star.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';

import "./DeviceItem.css"

const DeviceItem = ({device, brandName}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} onClick={() => {navigate(DEVICE_ROUTE + '/' + device.id)}}>
            <Card style={{cursor: "pointer"}} border='light' className='mt-3 item__card'>
                <Card.Img width={"250px"} height={"250px"} variant="top" src={process.env.REACT_APP_API_URL + device.img} />
                <Card.Body>
                    <div className='text-black-50'>
                        {brandName}
                    </div>
                    <div className='mt-2'>
                        {device.name}
                    </div>
                    <div className='d-flex flex-row justify-content-between mt-1'>
                        <div>
                            Цена: {device.price}р.
                        </div>
                        <div>
                            {device.rating} <Image src={star} />
                        </div>
                    </div>
                </Card.Body>

            </Card>
        </Col>
    );
};

export default DeviceItem;