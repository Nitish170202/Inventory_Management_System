import axios from 'axios';
import QRCodeLib from 'qrcode';
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QRGenerator = () => {
    let navigate = useNavigate();
  

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [qrCodeBase64, setQrCodeBase64] = useState('');
    const [showContainer, setShowContainer] = useState(true);

    const handleClose = () => {
        setShowContainer(false);
        window.location.href = "/"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const qrData = `Name: ${name}, Quantity: ${quantity}, Date: ${date}`;

        try {
            // Generate the QR code as a Base64 string
            const qrCodeBase64 = await QRCodeLib.toDataURL(qrData);
            setQrCodeBase64(qrCodeBase64);
            const balance = quantity;

            // Send the form data along with the QR code Base64 string to the backend
            const response = await axios.post('http://localhost:3001/item/additem', {
                name,
                quantity,
                date,
                balance,
                qrCodeBase64
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            navigate('/')

        } catch (error) {
            console.error(`Failed to save image: ${error.message}`);
        }
    };


    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      const today = getTodayDate();


    return (
        <>{showContainer && (
        <Container className="mt-5" style={{ backgroundColor: 'white', height: '25rem' }}>
             <Button
                        variant="danger"
                        onClick={handleClose}
                        style={{
                            position: 'relative',
                            top: '10px',
                            right: '-1250px',
                            // borderRadius: '50%',
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1rem'
                        }}
                    >
                        &times;
                    </Button>
            <h2 className="text-center">QR Code Generator</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Select  value={name} onChange={(e) => setName(e.target.value)} aria-label="Default select example">
                    <option>Select Name</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                    <option value="C4">C4</option>
                    <option value="C5">C5</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        max={today}
                    />
                </Form.Group>
                <Button type="submit" className="mt-3">Generate QR Code</Button>
            </Form>
            {qrCode && (
                <div className="text-center mt-5">
                    <QRCode value={qrCode} />
                    <p className="mt-3">{qrCode}</p>
                </div>
            )}
        </Container>)}
        </>
    );
};

export default QRGenerator;
