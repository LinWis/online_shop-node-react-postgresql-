import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar/TypeBar';
import BrandBar from '../components/BrandBar/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/DeviceAPI';
import Pages from '../components/Pages';

const Shop = observer (() => {

    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => {
            device.setTypes(data)
        }).catch(e => {
            console.log(e.response.data.message)
        })

        fetchBrands().then(data => {
            device.setBrands(data)
        }).catch(e => {
            // console.log(e.response.data.message)
        })

        fetchDevices(null, null, 1, 10).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).catch(e => {
            console.log(e.response.data.message)
        })

    }, [])

    useEffect(() => {
        fetchDevices(device.selectedBrand.id, device.selectedType.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).catch(e => {
            console.log(e.response.data.message)
        })

    }, [device.page, device.selectedBrand, device.selectedType])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>

                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;