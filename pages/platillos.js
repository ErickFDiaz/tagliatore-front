import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const Platillos = () => {
    const [platillos, setPlatillos] = useState([]);
    const [platillo, setPlatillo] = useState({ name: '', price: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchPlatillos();
    }, []);

    const fetchPlatillos = async () => {
        const req = await fetch('http://localhost:9999/api/1.0/dish/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const resp = await req.json();
        setPlatillos(resp.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ingredients') {
            setPlatillo({ ...platillo, [name]: value.split(',') });
            return;
        }
        setPlatillo({ ...platillo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updatePlatillo(platillo);
        } else {
            createPlatillo(platillo);
        }
    };

    const createPlatillo = async (newPlatillo) => {
        await fetch('http://localhost:9999/api/1.0/dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newPlatillo),
        });
        await fetchPlatillos();
        setPlatillo({ name: '', price: '', category: '', ingredients: '', image: '' });
    };

    const updatePlatillo = async (updatedPlatillo) => {
        await fetch(`http://localhost:9999/api/1.0/dish/${updatedPlatillo._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedPlatillo),
        });
        await fetchPlatillos();
        setPlatillo({ name: '', price: '', category: '', ingredients: '', image: '' });
        setIsEditing(false);
    };

    const editPlatillo = (platillo) => {
        setPlatillo(platillo);
        setIsEditing(true);
    };

    const deletePlatillo = async (id) => {
        // Replace with your data deletion logic
        await fetch(`http://localhost:9999/api/1.0/dish/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        await fetchPlatillos();
    };

    return (
        <div>
            <Navbar />
            <h2>Administrar Platillos</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={platillo.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Precio:
                    <input type="text" name="price" value={platillo.price} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Categoria:
                    <input type="text" name="category" value={platillo.category.name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Ingredientes:
                    <input type="text" name="ingredients" value={platillo.ingredients} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Imagen:
                    <input type="text" name="category" value={platillo.image} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Platillo</button>
            </form>

            <ul>
                {platillos.map((platillo) => (
                    <li key={platillo._id}>
                        {platillo.name} - {platillo.price} - {platillo.category.name}
                        <button onClick={() => editPlatillo(platillo)}>Edit</button>
                        <button onClick={() => deletePlatillo(platillo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Platillos;
