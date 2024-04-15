'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/trpc/react';

const page = () => {
    const email = useSearchParams().get('email')
    const router = useRouter()

    const [otp, setOtp] = useState<any>('');

    const verifyemail = api.auth.verifyemail.useMutation({
        onSuccess: ({ result }: any) => {

            localStorage.setItem('user', JSON.stringify({
                id: result?.data?.json?.user?.id,
                isVerified: result?.data?.json?.user?.isVerified,
            }))

            router.push('/login')
        },
        onError: (error) => {
            console.log('Error', error);
        }
    });

    const handleSubmit = () => {
        console.log(otp);
        verifyemail.mutate({
            email: email?.toString() || '',
            otp: otp
        });
    };
    return (
        <>
            <div className="max-w-full flex justify-center items-center mt-10">
                <div className="flex flex-col  w-2/5 p-5 rounded-2xl shadow-lg border-2  max-sm:w-4/5  md:w-4/5 lg:w-2/5 max-md:w-4/5">
                    <div className="mt-10 text-center">
                        <h2 className="text-2xl text-black font-semibold">
                            Verify Your Email
                        </h2>
                    </div>
                    <div className="">
                        <p className="px-20 py-2 text-center max-sm:px-10">
                            Enter 8 digit Code You have recevied own mail &nbsp;{' '}
                            <span className="font-medium">{email}</span>
                        </p>
                    </div>
                    <div className="flex lg:mx-20  max-sm:mx-0  max-md:mx-10">
                        <div>
                            <label className="text-lg font-bold text-gray-700 tracking-wide">
                                Code
                            </label>
                            <div className="flex  lg:space-x-4  max-sm:space-x-1 max-md:space-x-2 ">
                                <input
                                    pattern="[0-9]*"
                                    onChange={(e) => setOtp(e.target.value)}
                                    type="text"
                                    value={otp}
                                    className="w-8 h-8 border-2 border-gray-400 rounded-md "
                                />
                                {/* <input
                  maxLength="1"
                  type="text"
                  pattern="[0-9]*"
                  onChange={(e) => handleChange(index, e)}
                  className="w-8 h-8 border-2 border-gray-400 rounded-md "
                />
                <input
                  maxLength="1"
                  pattern="[0-9]*"
                  onChange={(e) => handleChange(index, e)}
                  type="text"
                  className="w-8 h-8 border-2 border-gray-400 rounded-md "
                />
                <input
                  maxLength="1"
                  pattern="[0-9]*"
                  onChange={(e) => handleChange(index, e)}
                  type="text"
                  className="w-8 h-8 border-2 border-gray-400 rounded-md "
                />
                <input
                  type="text"
                  maxlength="1"
                  onChange={(e) => handleChange(index, e)}
                  className="w-8 h-8 border-2 border-gray-400 rounded-md "
                />
                <input
                  type="text"
                  maxlength="1"
                  onChange={(e) => handleChange(index, e)}
                  className="w-8 h-8 border-2 border-gray-400 rounded-md "
                /> */}
                            </div>
                            <div className="mt-14 mb-16">
                                <button onClick={handleSubmit} >vefy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default page;