import React from 'react'
// import { default as DatePick } from "react-date-picker";
// import { makeStyles } from '@mui/styles';


import { format, isAfter, isEqual } from "date-fns";
import config from "../config";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { InputBoxSize } from './../utils';
import { updateForm } from '../redux/formReducer';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isValidateDate } from '../commonFunctions';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// npm install react-date-picker --force
// const useStyles:any = makeStyles({
//     input: {
//       fontFamily: "sans-serif",
//       fontSize: "14px",
//       width:'100%',
//       boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
//       outline:'none',
//       height: "40px",
//       "& .react-date-picker__wrapper": {
//         padding: "0 10px",
//         borderColor: "#ccc",
//         borderRadius: "4px"
//       },
//       "& .react-date-picker--open": {
//         borderColor: "red"
//       }
//     },
//     label: {
//       width: "58px",
//       marginTop: "-7px",
//       marginLeft: "12px",
//       backgroundColor: "white",
//       position: "absolute",
//       zIndex: "2000",
//       fontSize: "11px",
//       fontFamily: "sans-serif",
//       paddingLeft: "10px"
//     }
//   });

const DOB = ({name,altName, label, validation}:any) => {
    // const classes = useStyles();
    const dispacth = useAppDispatch()
    const state = useAppSelector((state: any) => state);
	const { form} = state.form;
    const [value, setValue] = React.useState(form[name]?form[name]:null);


    
    
    // const [value, setValue] = React.useState(null);
    // const handleChange = (newValue:any) => {
    //     setValue(newValue);
    // };
    // React.useEffect(() => {
    //     const datepicket:any = document.getElementsByClassName('react-date-picker__calendar react-date-picker__calendar--open')
    //     for(var i=0; i<datepicket.length; i++)
    //     {
    //         datepicket[i].style["z-index"] = 100;
    //         datepicket[i].style["width"] = '225px';
    //         datepicket[i].style["height"] = '270px';
    //     }
    //     const data:any = document.getElementsByClassName('react-date-picker__inputGroup__input')
    //     for(i=0; i<data.length; i++)
    //     {
    //         data[i].style["outline"] = 'none';
    //         data[i].style["background"] = 'none';
    //     }
    //   }, [changes])
  return (
    <div className="w-full my-5 flex justify-around gap-2 items-center relative">
       <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label={label}
                value={value}
                maxDate={new Date()}
                minDate={new Date('01/01/1850')}
                onChange={(newValue:any) => {
                    try {
                        if(format(new Date( newValue ? newValue : null ), config.dateFormat))
                        {
                            setValue(newValue)
                            dispacth(updateForm({[name]:format( newValue, config.dateFormat )}))
                        }
                    } catch (error) {
                        setValue(newValue)
                    }
                }}
                renderInput={(params:any) => {
                    const props:any = {...params, size:InputBoxSize, className:'w-full shadow-md', placeholder:'MM/DD/YYYY', error:(validation && !isValidateDate(form[name])) };
                        return <TextField {...props } />
                    }
                }
            />
        </LocalizationProvider>
       
        {/* <label className={'absolute bg-white left-3 px-1 '} style={{zIndex:1, color:'rgba(0, 0, 0, 0.6)',top:'-0.55rem',fontFamily:`"Roboto","Helvetica","Arial",sans-serif`,fontSize:'12px',fontWeight:400}}>{label}</label>
            <DatePick
                onCalendarOpen={()=>setChanges((state:any)=>!state)}
                value={form?.[altName]}
                format='MM/dd/y'
                openCalendarOnFocus={false}
                onChange={(value:any)=>{
                    if(value)
                        dispacth(updateForm({[name]:format(value,config.dateFormat),[altName]:value}));
                    else
                        dispacth(updateForm({[name]:'',[altName]:''}));
                }}
                className={`${classes.input} ${( validation && (!form?.[name] || 
                    !(
                        isEqual( new Date(format(new Date(),config.dateFormat)) 
                        ,new Date(format(new Date(form?.[name] ?? null),config.dateFormat))) 
                    || 
                        isAfter(new Date(format(new Date(),config.dateFormat)),
                        new Date(format(new Date(form?.[name] ?? ''),config.dateFormat))) 
                    )
                    
                ))? ' rounded-md border-2 border-orange':''
            
            } `}
            /> */}
    </div>
  )
}

export default DOB