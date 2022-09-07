import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { updateForm } from '../redux/formReducer';
import { InputBoxSize } from '../utils';
interface selectProp{
    e:any;
    form:any;
    dispacth:(data:any)=>void;
    submit?:any;
}
const SelectComponent:React.FC<selectProp> = ({e,form,dispacth,submit}) => {
  return (
    <FormControl fullWidth size={ InputBoxSize } className='shadow-md'>
        <InputLabel id={`demo-simple-select-label${e.label}`}>{e.label}</InputLabel>
        <Select
            name={e.name}
            labelId={`demo-simple-select-label${e.label}`}
            id={`demo-simple-select-label${e.label}`}
            label={e.label}
            error={submit && e.required && !form[e.name]}
            onChange={(event)=>dispacth(updateForm({ [event.target.name]: event.target.value }))}
            >
                {e.list.map((ee:any)=><MenuItem value={ee.value}>{ee.value}</MenuItem>)}
        </Select>
    </FormControl>
  )
}

export default SelectComponent;