import React from 'react';

const InputBox = (props: any) => {
  return (
    <input
      {...props}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      className={props.className}
    />
  );
};

export default InputBox;
