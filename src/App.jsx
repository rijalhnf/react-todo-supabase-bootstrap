// link tutorial: https://www.youtube.com/watch?v=4yVSwHO5QHU

import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Navbar, NavbarBrand, Row } from 'react-bootstrap';
import './App.css';
import { useState, useEffect } from 'react';
import ProductCard from './productCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from './supabaseClient.js';


function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  console.log(name);
  console.log(description);

  useEffect(() => {
    getProducts();
  }, [])

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10)
      if (error) throw error;
      if (data != null) {
        setProducts(data); //array of object
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCreateProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name, //yg kiri nama kolom di supabase, kanan nama const name yg udh masuk dari setName button
          description: description,
        })
        .single()
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  console.log(products.map);
  return (
    <Container className="mx-auto"> {/* Add the 'mx-auto' class here */}
      <Row>
        <Col xs={10} md={8}>
          <h2>Create Product for Supabase Database</h2>
          <Form.Group>
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)} //input ini masuk ke const name
            />
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)} //input ini masuk ke const description
            />
          </Form.Group>
          <br></br>
          <Button onClick={() => handleCreateProduct()}>Create Product in Supabase DB</Button>
        </Col>
      </Row>
      <hr></hr>
      <h3>Current Database Items</h3>

      <Row xs={1} md={2} lg={3} className='g-4'>

        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}

      </Row>
    </Container>
  );
}

export default App
