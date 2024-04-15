'use client';
import React, { useState } from 'react';
import { api } from "@/trpc/react";
import { useRouter } from 'next/navigation'
const page = () => {
    const router = useRouter()

    const [inputdata, setInputData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const inputChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    };

    const createPost = api.auth.register.useMutation({
        onSuccess: (data: any) => {
            console.log('Done', data);
            router.push('/verfymail?email=' + inputdata.email)
        },
        onError: (error) => {
            console.log('Error', error);
        }
    });

    const submitData = async (e: any) => {
        e.preventDefault();
        createPost.mutate(inputdata);
    };
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-2/5 p-5 rounded-lg shadow-lg border-2 max-sm:w-full mx-auto max-md:w-full">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Create Your Account
                    </h2>
                    <div className="mt-8 space-y-6 w-4/5 mx-auto">
                        <div className="">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={inputdata.name}
                                onChange={inputChange}
                                placeholder="Enter your name"
                                className="w-full text-base px-3 py-2 border-2 rounded-lg border-gray-300"
                            />
                        </div>

                        <div className="">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={inputdata.email}
                                onChange={inputChange}
                                placeholder="Enter your email"
                                className="w-full text-base px-3 py-2 border-2 rounded-lg border-gray-300"
                            />
                        </div>
                        <div className="">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={inputdata.password}
                                onChange={inputChange}
                                required
                                placeholder="Enter your password"
                                className="w-full text-base px-3 py-2 border-2 rounded-lg border-gray-300"
                            />
                        </div>

                        <div className="mt-8 content-center">
                            <button
                                onClick={submitData}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 content-center flex justify-center space-x-2 mb-20">
                        <p className="text-md text-center">Have an account? </p>
                        <a href="/login" className="text-md font-medium">
                            LOGIN
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
