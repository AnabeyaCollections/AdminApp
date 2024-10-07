import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';
const host = 'https://anabeya-backend.onrender.com';

export default function AllProducts(props) {
    let [products, setProducts] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('code')){
            navigate('/auth');
        }
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${host}/products/getproducts`);
                const productData = await response.json();
                if (productData.length > 0) {
                    setProducts(productData);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${host}/products/deleteproduct/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();

                setProducts(products.filter(product => product._id !== id));
                props.showAlert('Product deleted','success')
            } 
      catch (error) {
            console.error('Error deleting product:', error);
            props.showAlert('Error please try again','error')
        }
    };

    return (
        <div className="container mx-auto p-4 pt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden relative flex flex-col justify-center items-center p-3">
                        <img src={product.image} alt={product.name} className="w-56 h-56 object-cover rounded-xl" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">RS {product.price}</p>
                        </div>
                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="absolute top-2 right-2 text-red-600 text-xl"
                        >
                         <Trash/>  
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
