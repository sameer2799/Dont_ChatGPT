import { TextField } from '@mui/material';
import React from 'react';

type Props ={
    type: string,
    name: string,
    label: string
};

const CustomizedInput = (props: Props) => {
    
    return (
        <TextField
            InputLabelProps={{ style: { color: "white" } }}
            name={props.name}
            label={props.label}
            type={props.type}
            margin='normal'
            InputProps={{ style: { width: "400px", borderRadius: 10, fontSize: 20, color: "white" } }}
        />
    )
};

export default CustomizedInput;