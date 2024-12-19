import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState({ name: '', price: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        const req = await fetch('http://localhost:9999/api/1.0/category', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const resp = await req.json();
        setCategorias(resp.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ingredients') {
            setCategoria({ ...categoria, [name]: value.split(',') });
            return;
        }
        setCategoria({ ...categoria, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateCategoria(categoria);
        } else {
            createCategoria(categoria);
        }
    };

    const createCategoria = async (newCategoria) => {
        await fetch('http://localhost:9999/api/1.0/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(newCategoria),
        });
        await fetchCategorias({ name: ''});
        setCategoria({ name: '', price: '', category: '' });
    };

    const updateCategoria = async (updatedCategoria) => {
        await fetch(`http://localhost:9999/api/1.0/category/${updatedCategoria._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedCategoria),
        });
        await fetchCategorias();
        setCategoria({ name: '' });
        setIsEditing(false);
    };

    const editCategoria = (categoria) => {
        setCategoria(categoria);
        setIsEditing(true);
    };

    const deleteCategoria = async (id) => {
        await fetch(`http://localhost:9999/api/1.0/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        await fetchCategorias();
    };

    return (
        <div>
            <Navbar />
            <h2>Administrar Categorias</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={categoria.name} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{isEditing ? 'Update' : 'Add'} Categoria</button>
            </form>

            <ul>
                {categorias.map((categoria) => (
                    <li key={categoria._id}>
                        {categoria.name} - {categoria.price} - {categoria.category}
                        <button onClick={() => editCategoria(categoria)}>Edit</button>
                        <button onClick={() => deleteCategoria(categoria._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categorias;
