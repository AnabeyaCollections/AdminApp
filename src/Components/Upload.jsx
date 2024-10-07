import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const host = 'https://anabeya-backend.onrender.com'


const Upload = (props) => {
   let navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        catagory: '',
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!localStorage.getItem('code')){
            navigate('/auth');
        }
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('catagory', formData.catagory);
        data.append('price', formData.price);
        data.append('image', formData.image);

        try {
            const response = await axios.post(`${host}/products/add-product`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           props.showAlert('Item uploaded successfully','success');
           navigate('/')

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
        }
    };



 

    return (

        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen py-10 pt-20 px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Upload Product</h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="catagory" className="block text-gray-700">Category</label>
                            <select
                                id="catagory"
                                name="catagory"
                                value={formData.catagory}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="kids">Kids</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="extra-large">Extra Large</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700">Price</label>
                            <input
                                type="number" // Changed to number for price
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-gray-700">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>

            

        </>
    );
};

export default Upload;
