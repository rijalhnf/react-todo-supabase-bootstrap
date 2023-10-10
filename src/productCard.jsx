import { Card, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { supabase } from "./supabaseClient";

function ProductCard(props) {
    // console.log(props);
    const product = props.product;

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);

    // ini mirip banget sama insert, beda di hapus single, dan masukin .eq
    async function handleUpdateProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .update({
                    name: name, //yg kiri nama kolom di supabase, kanan nama const name yg udh masuk dari setName button
                    description: description,
                })
                .eq("id", product.id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function handleDeleteProduct() {
        try {
            const { data, error } = await supabase
                .from("products")
                .delete()
                .eq("id", product.id)
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    {editing == false ?
                        <>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Button className='mt-1' variant="danger" onClick={() => handleDeleteProduct()}>Delete Product</Button>{' '}
                            <Button className='mt-1' variant="secondary" onClick={() => setEditing(true)}>Edit Product</Button>
                        </>
                        : <>

                            <h3> Editing Product </h3>
                            <Form.Group>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="name"
                                    defaultValue={product.name} // ini jadinya ga kosong, tapi udah keisi sesuai data skrg (keren)
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Label>Product Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="description"
                                    defaultValue={product.description} // ini jadinya ga kosong, tapi udah keisi sesuai data skrg (keren)
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <br></br>
                            <Button className='mt-1' variant="success" onClick={() => handleUpdateProduct()}>Edit! (insert in Supabase DB)</Button>{' '}
                            <Button className='mt-1' variant="secondary" onClick={() => setEditing(false)}>Go Back</Button>
                            <br></br>
                        </>}

                </Card.Body>
            </Card >
        </>
    )
}

export default ProductCard;