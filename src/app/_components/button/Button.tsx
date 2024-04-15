import React from 'react';

const Button = (props: any) => {
  return (
    <>
      <button
        type={props.type}
        className="w-full py-3 mt-4 bg-black rounded-lg
                        font-medium text-white uppercase
                        focus:outline-none hover:bg-white hover:text-black border-2 border-black"
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
