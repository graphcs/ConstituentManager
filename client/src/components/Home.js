import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Home() {
    // State for constituents data
    const [constituents, setConstituents] = useState([]);
    // State for search input
    const [searchTerm, setSearchTerm] = useState('');
    // State for sorting
    const [sortOrder, setSortOrder] = useState('asc');

    const apiUrl = process.env.REACT_APP_API_URL;
    // useEffect to fetch constituents data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'your-api-endpoint' with the actual API endpoint
                const response = await fetch(`${apiUrl}/api/constituents`);
                const data = await response.json();
                setConstituents(data.data);
            } catch (error) {
                console.error('Error fetching constituents:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on component mount

    // Function to handle sorting
    const handleSort = () => {
        const sortedConstituents = [...constituents].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setConstituents(sortedConstituents);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Function to filter constituents based on search term
    const filteredConstituents = constituents.filter((constituent) =>
        constituent.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <div className='w-full flex justify-center'>
                <nav className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 mt-2">Welcome to Constituent Management System</h2>
                    <ul className="flex">
                        <li className="mr-4">
                            <Link to="/" className="text-blue-500 hover:underline">
                                Home
                            </Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/add" className="text-blue-500 hover:underline">
                                Add Constituent
                            </Link>
                        </li>
                        
                        {/* TODO: Uncomment to support merging duplicates. Note: Must also remove unique email schema key for it to be useful.
                        <li className="mr-4">
                            <Link to="/check_duplicates" className="text-blue-500 hover:underline">
                                Merge Duplicates
                            </Link>
                        </li>
                        */}

                        <li className="mr-4">
                            <Link to="/export" className="text-blue-500 hover:underline">
                                Export CSV
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='flex justify-center'>
                <div className='innerContainer'>
                    {/* Search and Sort */}
                    <div className="w-full mb-4 flex justify-between">
                        <input
                            type="text"
                            placeholder="Search constituents"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded mr-2"
                        />
                        <button onClick={handleSort} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800">
                            {sortOrder === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
                        </button>
                    </div>

                    {/* Constituents Table */}
                    <div className="overflow-x-auto max-h-[400px]">
                        <table className="border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-2 border-b">Name</th>
                                    <th className="p-2 border-b">Email</th>
                                    <th className="p-2 border-b">Address</th>
                                    {/* Add other header columns as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredConstituents.map((constituent) => (
                                    <tr key={constituent.id}>
                                        <td className="p-2 border-b">{constituent.name}</td>
                                        <td className="p-2 border-b">{constituent.email}</td>
                                        <td className="p-2 border-b">{constituent.address}</td>
                                        {/* Add other columns as needed */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;