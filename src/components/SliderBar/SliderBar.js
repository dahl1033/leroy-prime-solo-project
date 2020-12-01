import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Slider from '@material-ui/core/Slider';


export default function SlderBar(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();

    // state variables
    const [ value, setValue ] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value);
    };
    const handleChangeCommitted = () => {
        dispatch({type: 'ADD_PROPORTION', payload: {id: props.id, value: value, mixId: props.mixId}});    

    }

    const marks = [
        {
            value: 10,
        },
        {
            value: 20,
            label: '20%',
        },
        {
            value: 30,
        },
        {
            value: 40,
            label: '40%',
        },
        {
            value: 50,
        },
        {
            value: 60,
            label: '60%',
        },
        {
            value: 70,
        },{
            value: 80,
            label: '80%',
        },
        {
            value: 90,
        }
        ];

    return (
        <div>
            <Slider
                id="slider"
                // getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={10}
                marks={marks}
                valueLabelDisplay="on"  
                graduated
                progress          
                value={props.proportion}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
             />
        </div>
    );
}