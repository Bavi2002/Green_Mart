import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
import LayoutNew from "../Layout";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const [categoriesData, setCategoriesData] = useState({});
    const [products, setProducts] = useState([]);

    // Fetch products data
    useEffect(() => {
        axios.get('http://localhost:3000/api/products/getImages')
            .then(res => {
                setProducts(res.data);
                const categories = {};

                res.data.forEach(product => {
                    const category = product.category;
                    if (!categories[category]) {
                        categories[category] = { names: [], quantities: [] };
                    }
                    const index = categories[category].names.indexOf(product.name);
                    if (index === -1) {
                        categories[category].names.push(product.name);
                        categories[category].quantities.push(product.quantity);
                    } else {
                        categories[category].quantities[index] += product.quantity;
                    }
                });

                setCategoriesData(categories);
            })
            .catch(err => console.log(err));
    }, []);

    // Prepare chart data for each category
    const charts = Object.keys(categoriesData).map(category => {
        const { names, quantities } = categoriesData[category];

        const barData = {
            labels: names,
            datasets: [
                {
                    label: 'Product Quantity',
                    data: quantities,
                    backgroundColor: '#4CAF50', // Green
                },
            ],
        };

        return (
            <LayoutNew>

            <div key={category} className="-mb-5">
                {/* Bar Chart */}
                <div className="bg-white p-1 rounded-lg shadow-lg h-[800px] border border-green-800">
                <h3 className="text-lg font-semibold mb-4 text-green-700">{category} - Product Quantities</h3>
                    <Bar 
                        data={barData} 
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(tooltipItem) {
                                            return tooltipItem.label + ': ' + tooltipItem.raw;
                                        }
                                    }
                                }
                            },
                            layout: {
                                padding: 20,
                            }
                        }} 
                        height={200} 
                    />
                </div>
            </div>
            </LayoutNew>

        );
    });



    return (
        <div >
            {charts}
        </div>
    );
};

export default Dashboard;
