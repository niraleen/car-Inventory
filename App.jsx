import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// import logo from './logo.svg';
import './App.css';
import { deleteCar, getCars } from './services/cars-service'
import { Col, Form } from 'react-bootstrap';

import { CreateCar } from './CreateCar'

function App() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('')
  const [display, setDisplay] = useState('create')

  useEffect(() => {
    fetchAllCars()
  }, [])

  const fetchAllCars = () => {
    getCars().then(res => {
      console.log({ response: res.data })
      setCars(res.data)
    });
  }

  const handleDelete = (id) => {
    console.log({ id })
    deleteCar(id).then(res => {
      setCars((prev) => {
        let newList = prev.filter(item => item.id !== id) // locate the deleted item and remove it from the car list
        return newList;
      })
    })
  }

  let modiList = [...cars];

  // Logic for searching list
  modiList = modiList.filter((item) => {
    const search_params = search.toLowerCase();

    const name = item.name
      ? item.name.toLowerCase()
      : 'no-name';
    const existName = name.search(search_params) > -1;

    const brand = item.brand
      ? item.brand.toLowerCase()
      : 'no-brand';
    const existBrand = brand.search(search_params) > -1;

    const color = item.color
      ? item.color.toLowerCase()
      : 'no-color';
    const existColor = color.search(search_params) > -1;

    if (existName || existBrand || existColor) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <Container className="p-3">
      <Row>
        <Col xs={3} >
          <Button onClick={() => { fetchAllCars(); setDisplay('view-table') }}>View</Button>
        </Col>

        <Col xs={3} >
          <Button onClick={() => setDisplay('create-form')}>Create</Button>
        </Col>
      </Row>

      {display === 'create-form' &&
        <CreateCar />
      }

      {
        display === 'view-table' &&
        <>
          <Row className="py-3">
            <Col className="p-1" md={6} xs={12}>


              <Form>
                <Form.Group controlId="carName">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Search by name, brand, color'
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                </Form.Group>
              </Form>
            </Col>

          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {modiList && modiList.map((car, index) =>
                  <tr key={car.id}>
                    <td>{index+1}</td>
                    <td>{car.name}</td>
                    <td>{car.brand}</td>
                    <td>{car.color}</td>
                    <td>
                      <div onClick={() => handleDelete(car.id)}><FontAwesomeIcon icon={faTrash} /> </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
        </>
      }

    </Container>
  );
}

export default App;
