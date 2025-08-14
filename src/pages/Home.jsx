import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllcompany } from '../api/Api'; 

function Home() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);




    useEffect(() => {
        getAllcompany()
            .then((res) => {
                setCompanies(res.data);
            })
            .catch((error) => {
                console.error("Error fetching companies:", error);
            });
    }, []);

    return (
        <div className="p-6">
            <button
                onClick={() => navigate("/create")}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                Create Company
            </button>

            <table className="border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Logo</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies?.map((company) => (
                        <tr key={company._id}>
                            <td className="border p-2">{company.name}</td>
                            <td className="border p-2">
                                {company.logo && (
                                    <img
                                        src={`http://localhost:4000${company.logo}`}
                                        alt={company.name}
                                        className="h-12 object-contain"
                                    />
                                )}
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => navigate("/create")}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
