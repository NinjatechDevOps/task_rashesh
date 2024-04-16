'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faMagnifyingGlass,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {

  return (
    <>
      <div className=" bg-white shadow-lg">
        <div className="flex flex-col  p-4">
          <div className="bg-white">
            <div className=" float-right">
              <ul className="flex space-x-6">
                <li>Help</li>
                <li>order & returns</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className=" text-black font-bold">
              <h1 className="text-2xl">ECOMMERCE</h1>
            </div>
            <div className="menu">
              <ul className="flex justify-evenly gap-10  max-sm:hidden max-md:hidden">
                <li className="font-semibold text-lg">Categories</li>
                <li className=" font-semibold text-lg">Sale</li>
                <li className="font-semibold text-lg">Clearnace</li>
                <li className="font-semibold text-lg">New Stock</li>
                <li className=" font-semibold text-lg">Trending</li>
              </ul>
            </div>
            <div className="flex  gap-10  ">
              <FontAwesomeIcon icon={faMagnifyingGlass} className=" w-5 h-5 " />
              <FontAwesomeIcon icon={faShoppingCart} className=" w-5 h-5 " />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-10 flex justify-center items-center gap-10">
        <FontAwesomeIcon icon={faChevronLeft} className=" w-5 h-5 " />
        <p className="text-md  font-medium">Get 10% of Business Signup</p>{' '}
        <FontAwesomeIcon icon={faChevronRight} className=" w-5 h-5 " />
      </div>
    </>
  );
};

export default Header;
