
import React, { useState } from "react";
import { createCompany } from "../api/Api";
import { useNavigate } from "react-router-dom";

export default function CreateCompany() {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null)
    const navigate = useNavigate();


   async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data={
                name,
                logo:file
            }
            const res = await createCompany(data);
            console.log(res);
            if(res.status===409){
                return alert("name already use")
            }
            else if (res.status===201)
            {
                alert("success")
                navigate("/home");
            }
            
            

            
        }
        catch (error) {
            alert("Register error: " + (error.message || "Unknown error"));
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Create Company</h1>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    placeholder="Enter company name"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                    placeholder="Enter company name"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </form>
        </div>
    );
}