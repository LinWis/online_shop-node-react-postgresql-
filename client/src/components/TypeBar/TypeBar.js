import React, { useContext } from 'react';
import { Context } from '../../index';
import { ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import "./TypeBar.css"

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    const click = (item) => {
        if (item.id === device.selectedType.id)
            device.setSelectedType('')
        else
            device.setSelectedType(item)
    }

    return (
        <ListGroup>
            {device.types.map(item => (
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    active={item.id === device.selectedType.id}
                    onClick={() => click(item)}
                    key={item.id}
                    className="list__item__type"
                >

                    {item.name}

                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;