import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const Ordenes = () => {
    const [rdenes, setOrdenes] = useState([]);
    const [orden, setOrden] = useState({ table: { name: '' }, client: { name: '' }, waiter: { name: '' }, status: '', orderDetails: [ { dish: '', quantity: '' } ] });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchOrdenes();
    }, []);

    const fetchOrdenes = async () => {
        const req = await fetch('http://localhost:9999/api/1.0/order/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const resp = await req.json();
        setOrdenes(resp.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dish') {
            setOrden({ ...orden, orderDetails: [ { dish: value, quantity: orden.orderDetails[0].quantity }] });
            return;
        }
        if (name === 'quantity') {
            setOrden({ ...orden, orderDetails: [ { dish: orden.orderDetails[0].dish, quantity: value }] });
            return;
        }
        setOrden({ ...orden, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateOrden(orden);
        } else {
            createOrden(orden);
        }
    };

    const createOrden = async (newOrden) => {
        await fetch('http://localhost:9999/api/1.0/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newOrden),
        });
        await fetchOrdenes();
        setOrden({ table: { name: '' }, client: { name: '' }, waiter: { name: '' }, status: '', orderDetails: [ { dish: '', quantity: '' } ] });
    };

    const updateOrden = async (updatedOrden) => {
        await fetch(`http://localhost:9999/api/1.0/order/${updatedOrden._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedOrden),
        });
        await fetchOrdenes();
        setOrden({ table: { name: '' }, client: { name: '' }, waiter: { name: '' }, status: '', orderDetails: [ { dish: '', quantity: '' } ] });
        setIsEditing(false);
    };

    const editOrden = (orden) => {
        setOrden(orden);
        setIsEditing(true);
    };

    const deleteOrden = async (id) => {
        // Replace with your data deletion logic
        await fetch(`http://localhost:9999/api/1.0/order/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        await fetchOrdenes();
    };

    return (
        <div>
            <Navbar />
            <h2>Administrar Ordenes</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Mesa:
                    <input type="text" name="table" value={orden.table.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Cliente:
                    <input type="text" name="client" value={orden.client.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Mesero:
                    <input type="text" name="waiter" value={orden.waiter.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Estado:
                    <input type="text" name="status" value={orden.status} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Platillo:
                    <input type="text" name="dish" value={orden.orderDetails.dish} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Cantidad:
                    <input type="text" name="quantity" value={orden.orderDetails.quantity} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Orden</button>
            </form>

            <ul>
                {rdenes.map((orden) => (
                    <li key={orden._id}>
                        {orden.table.name} - {orden.client.name} - {orden.waiter.name} - {orden.status}
                        <button onClick={() => editOrden(orden)}>Edit</button>
                        <button onClick={() => deleteOrden(orden._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ordenes;
