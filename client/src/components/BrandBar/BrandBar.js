import { observer } from 'mobx-react-lite';
import React,  { useContext }  from 'react';
import { Context } from '../../index';
import { Card, Col, Row } from 'react-bootstrap';

import "./BrandBar.css"

const BrandBar = observer (() => {
    const { device } = useContext(Context);

    const click = (item) => {
        if (item.id === device.selectedBrand.id)
            device.setSelectedBrand('')
        else
            device.setSelectedBrand(item)
    }

    return (
            <Col className='d-flex w-100'>

                {device.brands.map(item => (
                    <Card
                        style={{ cursor: "pointer"}}
                        className='p-3 me-2 text-center card__item__brand'
                        border={item.id === device.selectedBrand.id ? 'danger' : ''}
                        key={item.id}
                        onClick={() => click(item)}
                        >
                            {item.name}
                            
                    </Card>
                ))}

            </Col>
    );
});

export default BrandBar;