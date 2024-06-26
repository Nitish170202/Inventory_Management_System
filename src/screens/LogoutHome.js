import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbars from '../components/Navbars';

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

  return (
    <>
    <Navbars/>
    <div className='my-5'>
    
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
                <a href={item.qrCodeUrl} download={`qrcode+${item.qrCodeUrl}`}><img src={item.qrCodeUrl} alt="QR Code" style={{ width: '100px', height: '100px' }} /></a>
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
}

export default UserItems;
