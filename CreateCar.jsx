import React, { useState} from 'react';
 
import { Form, Button } from "react-bootstrap";

import { postCars } from "./services/cars-service"


export const   CreateCar = () => { 
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');

    const onSave = () => { 
        let data =  { 
            name: name,
            brand: brand,
            color: color
        }
        postCars(data).then(resp => { 
            console.log({ resp });
        })
    }


    return ( 
      <Form className='p-3'>
        <Form.Group className="mb-3" controlId="carName">
          <Form.Label>Car Name</Form.Label>
          <Form.Control type="text" placeholder="Enter car name" value={name} onChange={(e => setName(e.target.value))} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carBrand">
          <Form.Label>Car Brand</Form.Label>
          <Form.Control type="text" placeholder="Enter car brand" value={brand} onChange={(e => setBrand(e.target.value))} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="color">
          <Form.Label>Car color</Form.Label>
          <Form.Control type="text" placeholder="Enter car color" value={color} onChange={(e => setColor(e.target.value))} />
        </Form.Group>

        <Button variant="primary" onClick={() => onSave()}>
          Submit
        </Button>
      </Form>
    )
}