import { Divider } from '@mui/material'
import React from 'react'
import { URL } from '../utils'
interface prop{
    location:any;
    overrideStyle?:any
}
const Header:React.FC<prop> = ({location,overrideStyle=false}) => {
  return (
    <div className={`${!overrideStyle ? '' : 'absolute top-0 w-full' }`}>
    <div className={`flex w-full ${location.schedularLite?.logo?.length===2 && location.schedularLite.logo?.filter((e:any)=>e)?.length === 2 ? `gap-1 justify-between`:``}`}>
        {location.schedularLite?.logo?.length ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            location.schedularLite?.logo?.filter((e:any)=>e).map((e:string,i:number)=><img key={i} src={e} className="p-2 w-5/12 max-h-24 md:w-48 lg:w-64" alt="Image Not Found" />)
            ) : (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={URL} className="p-2 w-5/12 max-h-24 md:w-48 lg:w-64" alt="Image Not Found" />
        )}
    </div>
    <Divider style={{borderWidth:3, backgroundColor:'rgb(36, 61, 77)'}} />
    </div>
  )
}

export default Header