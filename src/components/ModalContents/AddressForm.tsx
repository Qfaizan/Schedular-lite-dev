import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { updateForm } from '../../redux/formReducer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Input from '../../reUseableComponents/Input'
import { address } from '../../utils'
interface props{
    clicked:boolean;
}
const AddressForm:React.FC<props> = ({clicked}) => {
    const dispacth = useAppDispatch();
    const state = useAppSelector(state=>state);
    const {form}:any = state.form;
    return (
        <>{
            address.map(
            (e: any, i): any => (
                <div key={i}>
                    {i === 0 && (
                        <div className="w-full">
                            <input
                                type="checkbox"
                                checked={form.isNotHavePermanentAddress}
                                id="isNotHavePermanentAddress"
                                onChange={(value) => {
                                    if (value.target.checked) {
                                        dispacth(
                                            updateForm({
                                                isNotHavePermanentAddress: value.target.checked,
                                                zipCode: parseInt(form?.location?.zipcode) ?? "",
                                                address: form?.location?.address1 ?? '',
                                                city: form?.location?.city ?? '',
                                                country: form?.location?.country ?? '',
                                                state: form?.location?.state ?? ''
                                            })
                                        )
    
                                    }
                                    else {
                                        dispacth(
                                            updateForm({
                                                isNotHavePermanentAddress: value.target.checked,
                                                zipCode: "",
                                                address: "",
                                                city: '',
                                                country: '',
                                                state: ''
                                            })
                                        )
                                    }
                                }
                                }
                                className="mt-8 "
                            />
                            <label
                                htmlFor="isNotHavePermanentAddress"
                                className="ml-2 cursor-pointer"
                            >
                                I don't currently have a permanent address.
                            </label>
                        </div>
                    )}
                    {e.type === 'select' ?
                        <div key={i} className="w-full my-5 flex justify-around gap-2 items-center">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{e.label}</InputLabel>
                                <Select
                                    name={e.name}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={e.label}
                                    value={form[e.name]}
                                    error={clicked && e.required && !form[e.name]}
                                    onChange={(event) => dispacth(updateForm({ [event.target.name]: event.target.value }))}
                                >
                                    {e.list.map((ee: any) => <MenuItem value={ee.value}>{ee.value}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>
                        :
                        <div className="w-full my-8 flex justify-around gap-2 items-center">
                            <Input
                                value={form[e.name]}
                                error={clicked && e.required && !form[e.name]}
                                onChange={(value:any) => dispacth(updateForm({[e.name]:value.target.value}))}
                                disabled={form?.isNotHavePermanentAddress}
                                lable={e.label}
                                required={e.required}
                                name={e.name}
                                type={e.type}
                            />
                        </div>
                    }
                </div>
            )
            )
        }</>
    )
}
export default AddressForm