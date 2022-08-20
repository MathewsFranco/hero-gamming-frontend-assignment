import React from 'react';
import { CustomButton } from './styles';

const Button = ({ label, ...rest }) => {
  return <CustomButton {...rest}>{label}</CustomButton>;
};

export default Button;
