import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import React from 'react'
import { updateForm, updateSubscriberName } from '../../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Input from '../../reUseableComponents/Input';
import SelectComponent from '../../reUseableComponents/Select';
import { InputBoxSize, Insurance, policyHolder } from '../../utils'
import DOB from '../DOB';

const myStyle = {
    fontWeight: 'bold',
    fontSize: '15px',
    color: 'black'
}
interface props{
    clicked:boolean;
}
const InsuranceForm:React.FC<props> = ({clicked}) => {
    const dispacth = useAppDispatch();
    const state = useAppSelector((state: any) => state);
    const { form, subscriberName } = state.form;
    const [insuranceOwner, setInsuranceOwner] = React.useState(form?.insuranceFor);
    const autoPopulateName = () => {
        if (insuranceOwner === "i'm") {
            dispacth(
                updateForm({
                    subscriberFirstName: subscriberName.userFirstName ? subscriberName.userFirstName : form.firstName,
                    subscriberLastName: subscriberName.userLastName ? subscriberName.userLastName : form.lastName
                })
            )
        }
        else if (insuranceOwner !== "i'm") {
            dispacth(
                updateForm({
                    subscriberFirstName: subscriberName.othersFirstName ?? '',
                    subscriberLastName: subscriberName.othersLastName ?? ''
                })
            )
        }
    }

    const handleInsuranceModal = (e: any) => {
        if ((e.target.name === 'subscriberFirstName' || e.target.name === 'subscriberLastName') && insuranceOwner === "i'm") {
            if (e.target.name === 'subscriberFirstName') {
                dispacth(
                    updateForm({
                        [e.target.name]: e.target.value,
                    })
                )
                dispacth(
                    updateSubscriberName({
                        ...state.subscriberName,
                        userFirstName: e.target.value
                    })
                )
            }
            else {
                dispacth(
                    updateForm({
                        [e.target.name]: e.target.value,
                    })
                )
                dispacth(
                    updateSubscriberName({
                        ...state.subscriberName,
                        userLastName: e.target.value
                    })
                )
            }
        }
        else if ((e.target.name === 'subscriberFirstName' || e.target.name === 'subscriberLastName') && insuranceOwner !== "i'm") {
            if (e.target.name === 'subscriberFirstName') {
                dispacth(
                    updateForm({
                        [e.target.name]: e.target.value,
                    })
                )
                dispacth(
                    updateSubscriberName({
                        ...state.subscriberName,
                        othersFirstName: e.target.value
                    })
                )
            }
            else {
                dispacth(
                    updateForm({
                        [e.target.name]: e.target.value,
                    })
                )
                dispacth(
                    updateSubscriberName({
                        ...state.subscriberName,
                        othersLastName: e.target.value
                    })
                )
            }
        }
        else {
            dispacth(
                updateForm({
                    [e.target.name]: e.target.value,
                })
            )
        }
    }
    React.useEffect(() => {
        autoPopulateName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [insuranceOwner])
  return (
    <>
        {Insurance.map(
            (e: any, i): any => (
                <div key={i}>
                    { i === 0 && (
                        <>
                            <FormLabel id="insurance-radio-buttons-group">
                                <b style={myStyle}>Who is the policy holder?</b>
                            </FormLabel>
                            <RadioGroup
                                name={'insuranceFor'}
                                defaultValue={form.insuranceFor}
                                onChange={(event:any) => {
                                    setInsuranceOwner(() => {
                                        dispacth(updateForm({
                                            insuranceFor: event.target.value
                                        }))
                                        return event.target.value
                                    })
                                }}
                            >
                                <FormControlLabel
                                    value="i'm"
                                    control={<Radio />}
                                    label={'I am'}
                                />
                                <FormControlLabel
                                    value="my spouse or partner"
                                    control={<Radio />}
                                    label={'My spouse or partner'}
                                />
                                <FormControlLabel
                                    value="my Parents"
                                    control={<Radio />}
                                    label={'My Parents'}
                                />
                                <FormControlLabel
                                    value="someone else"
                                    control={<Radio />}
                                    label={'Someone else'}
                                />
                            </RadioGroup>
                        </>
                    )}
                    {i === 0 &&
                        insuranceOwner !== "i'm" &&
                        policyHolder.map((e) => (
                            e.type !== 'date' ?
                            <div className="w-full my-8 flex justify-around gap-2 items-center">
                                <Input
                                    value={form[e.name]}
                                    error={
                                        clicked && e.required && !form[e.name]
                                    }
                                    onChange={(e: any) =>
                                        dispacth(
                                            updateForm({
                                                [e.target.name]: e.target.value,
                                            })
                                        )
                                    }
                                    lable={e.label}
                                    required={e.required}
                                    name={e.name}
                                    type={e.type}
                                />
                            </div>
                            :
                            <DOB name={e.name} altName={'insuranceDOB'} label={e.label} validation={clicked} />
                        ))
                    }
                    {e.type === 'select' ?
                        <div key={i} className="w-full my-5 flex justify-around gap-2 items-center">
                            <SelectComponent e={e} value={form[e.name]} submit={clicked} form={form} dispacth={dispacth} />
                        </div>
                        :
                        e.type !== 'date' &&
                            <div className="w-full my-8 flex justify-around gap-2 items-center">
                                <Input
                                    value={form[e.name]}
                                    error={clicked && e.required && !form[e.name]}
                                    onChange={(e: any) => handleInsuranceModal(e)}
                                    lable={e.label}
                                    required={e.required}
                                    name={e.name}
                                    type={e.type}
                                />
                            </div>
                    }
                </div>
            )
        )}</>
    )
}

export default InsuranceForm