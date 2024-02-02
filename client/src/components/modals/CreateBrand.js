import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import React, { useState } from 'react';
import { createBrand } from '../../http/DeviceAPI';

const CreateBrand = ({show, onHide}) => {

    const [val, setVal] = useState("")

    const addBrand = () => {
        console.log('check')
        createBrand({name: val}).then(data => {
            setVal('')
            onHide()
        }).catch(e => {
        })
    }

    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Добавить тип
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Control
                        placeholder='Введите нзвние типа'
                        value={val}
                        onChange={e => setVal(e.target.value)}
                  />
              </Form>
          </Modal.Body>
          <Modal.Footer>
                <Button variant={"outline-success"} onClick={addBrand}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
          </Modal.Footer>
    </Modal>
    );
};

export default CreateBrand;