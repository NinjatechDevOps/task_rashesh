'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../_components/button/Button';
import InputBox from '../_components/inputbox/InputBox';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginMutation = api.auth.login.useMutation();

    const handleLogin = async (event: any) => {
        event.preventDefault();
        console.log(email, password);

        try {
            const response = await loginMutation.mutateAsync({ email, password });
            localStorage.setItem('userId', response.userId.toString());
            localStorage.setItem('isVerified', response.isVerified.toString());
            router.push('/dashboard')
        } catch (err) {
            setError(err.message || 'Failed to login');
        }
    }
    return (
        <>
            <div className=" max-w-full flex justify-center items-center mt-10 ">
                <form onSubmit={handleLogin} className=" w-2/5 p-5 rounded-2xl shadow-lg border-2  max-sm:w-4/5  md:w-4/5 lg:w-2/5 max-md:w-4/5">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Login
                    </h2>
                    <div className="mt-5 text-center">
                        <h3 className="text-center font-semibold text-xl  max-sm:text-sm">
                            Welcome Back to ECOMMERCE
                        </h3>
                        <p className="py-1">The next gen Business marketplace</p>
                    </div>
                    <div className="mt-8 space-y-6   w-4/5 mx-auto">
                        <div className="">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Email
                            </label>
                            <InputBox
                                type="email"
                                name="email"
                                placeholder="enter your email"
                                className="w-full text-base px-3 py-2   border-2  rounded-lg  border-gray-300e "
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label className="text-sm font-bold text-gray-700 tracking-wide">
                                Password
                            </label>
                            <div className="flex justify-evenly">
                                <InputBox
                                    type="password"
                                    name="password"
                                    placeholder="enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full text-base px-3 py-2   border-2  rounded-lg border-gray-300 "
                                />
                                <div className="relative">
                                    <span className="absolute  right-3 top-2 border-b-2 border-black">
                                        show
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 content-center border-b-2  border-gray-400 pb-10">
                            <Button text="LOGIN" type="submit" className="" />
                            <hr></hr>
                        </div>
                    </div>
                    <div className="mt-8 content-center flex justify-center space-x-2 mb-5">
                        <p className="text-md  text-center">Don't Have an account? </p>
                        <Link href="/register" className="text-md font-medium ">
                            SIGNUP
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
