import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const host = 'https://anabeya-backend.onrender.com';

export default function Orders(props) {
    const [orders, setOrders] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
            if(!localStorage.getItem('code')){
                navigate('/auth');
            }
            try {
                const response = await fetch(`${host}/orders/allorders`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const ordersData = await response.json();
                const reverseData = ordersData.slice().reverse();
                setOrders(reverseData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${host}/orders/updateorder/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            const updatedOrder = await response.json();
            // Update the local state
            setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
            props.showAlert('Status updated successfully','success');

        } catch (error) {
            console.error('Error updating order status:', error);
            props.showAlert('Error updating status','error');
        }
    };

    return (
        <div className="py-6 container mx-auto pt-20 px-4">
            <h2 className="text-2xl font-bold mb-4 text-center">All Orders</h2>
            <div className="space-y-6">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="bg-gray-100 shadow-md rounded-lg p-6">
                            <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Location: {order.location}</p>
                            <p className="text-gray-600">Status: {order.status}</p>
                            <p className="text-gray-600">Price: {order.price}</p>

                            <h4 className="mt-4 font-semibold">Change Status:</h4>
                            <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                className="border rounded-md p-2"
                            >
                                <option value="Sending Order">Sending Order</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Delivering">Delivering</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <h4 className="mt-4 font-semibold">Products:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                {order.Products.map((product) => (
                                    <div key={product.product} className="bg-white p-4 rounded-lg flex flex-col items-center">
                                        <img src={product.image} alt={product.productName} className="h-48 w-48 object-cover mb-2 rounded-lg" />
                                        <p className="font-semibold">Name: {product.name}</p>
                                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center">No orders placed yet.</p>
                )}
            </div>
        </div>
    );
}
