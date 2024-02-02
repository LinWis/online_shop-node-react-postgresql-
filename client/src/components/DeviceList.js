import React, { useContext } from 'react';
import { Context } from '..';
import DeviceItem from './DeviceItem/DeviceItem';
import { observer } from 'mobx-react-lite';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {forEach} from "react-bootstrap/ElementChildren";

const DeviceList = observer (() => {

    const { device } = useContext(Context)

    return (
        <Row className="d-flex">
            {device.devices.map(item =>  {

                let brandName = device.brands.find(brand => brand.id === item.brandId).name

                return (
                    <DeviceItem key={item.id} device={item} brandName={brandName}/>
                )
            })}
        </Row>
    );
});

export default DeviceList;