import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import delImg from '../components/Images/delete.png';
import editImg from '../components/Images/edit.jpg';

function UserItems() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formValues, setFormValues] = useState({ 
    name: '', 
    numberReceived: '', 
    numberDispatched: '', 
    dateDispatch: '' 
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/item/getitems`, {});
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormValues({ 
      name: item.name, 
      
      numberReceived: item.numberReceived,
      numberDispatched: item.numberDispatched || '', 
      dateDispatch: item.dateDispatch || '' 
    });
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    setEditingItem(item);
    setShowDeleteModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveEdit = async () => {
    console.log("skns",formValues)
    try {
      await fetch(`http://localhost:3001/item/edititem/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      }).then((response)=>{
        if(response.status==200){
            alert("Saved Successfully")
        }
        else{
            alert("Failed  ", response.message)
        }
      });
      setShowEditModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3001/item/items/${editingItem._id}`, {
        method: 'DELETE',
      });
      setShowDeleteModal(false);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='my-5'>
    <p>{items.qrCodeUrl}</p>
    
      {/* <h2 className="text-center my-4">User Items</h2> */}
      <Table striped bordered hover style={{ backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Item</th>
            <th>Status</th>
            <th>QR Code</th>
            <th>Admin Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{new Date(item.dateReceived).toLocaleDateString()}/ {item.numberReceived}</td>
              <td>{item.dateDispatch ? new Date(item.dateDispatch).toLocaleDateString() : '---'}/ {item.numberDispatched}</td>
              <td>{item.balanceItems}</td>
              <td>{item.status}</td>
              <td>
                <a href={item.qrCodeUrl} download={item.qrCodeUrl}><img src={item.qrCodeUrl} alt="QR Code" style={{ width: '100px', height: '100px' }} /></a>
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(item)} className="me-2">
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity Received</Form.Label>
              <Form.Control
                type="number"
                name="numberReceived"
                value={formValues.numberReceived}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity Dispatched</Form.Label>
              <Form.Control
                type="number"
                name="numberDispatched"
                value={formValues.numberDispatched}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Dispatch</Form.Label>
              <Form.Control
                type="date"
                name="dateDispatch"
                value={formValues.dateDispatch}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the item of <b>{editingItem?.name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          <img style={{width:'25px' , height:'30px'}} src={editImg} alt='delete'></img>
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
          <img style={{width:'25px' , height:'30px'}} src={delImg} alt='delete'></img>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserItems;
