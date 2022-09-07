/* eslint-disable jsx-a11y/img-redundant-alt */
import { Divider } from '@mui/material'
import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'
import { MdOutlineFlipCameraAndroid } from 'react-icons/md'
import { updateForm } from '../../redux/formReducer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Button from '../../reUseableComponents/Button'
import WebCam from '../../reUseableComponents/WebCam'
interface props{
    Close:(data?:any)=>void;
}
const GovtProof:React.FC<props> = ({Close }) => {
    const dispacth = useAppDispatch();
    const state = useAppSelector((state: any) => state);
    const { form } = state.form;
    const [uploadImage, setUploadImage] = React.useState<{ type: '' | 'front' | 'back', open: boolean }>({ type: '', open: false })
    const [images, setImages] = React.useState<{ front: string, back: string }>({ front: form?.govtIdFrontCard ?? '', back: form?.govtIdBackCard ?? '' })
    const imageUploaded = (image: string) => {
        if (image === 'completed') {
            dispacth(updateForm({
                isAddress: true,
                govtIdFrontCard: images.front,
                govtIdBackCard: images.back,
                address: form?.location?.address1,
                city: form?.location?.city,
                country: form?.location?.country,
                state: form?.location?.state,
                zipCode: form?.location?.zipcode,
                county: form?.location?.county,
                isNotHavePermanentAddress: true
            }))
            Close();
        }
        if (uploadImage.type && image)
            setImages(state => ({ ...state, [uploadImage.type]: image }))
        setUploadImage({ open: false, type: '' })
    }
  return (
        <>
            {uploadImage.open && uploadImage.type === 'front' && <div className='flex w-full justify-center'>
                <div className='flex justify-center w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12'>
                    <WebCam firstName={form.firstName + ' ' + form.lastName} onClose={() => setUploadImage({ open: false, type: '' })} onChange={imageUploaded} />
                </div>
            </div>}
            <div className='flex w-full justify-center'>
                <div className='w-full flex justify-center flex-col items-center'>
                    {!images.front ?
                        <>{uploadImage.type !== 'front' && <div className='rounded-3xl bg-slate-200 w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 p-5 m-10 relative cursor-pointer' onClick={() => setUploadImage({ type: 'front', open: true })}>
                            <p className='text-lg font-semibold'>GOVERNMENT ID</p>
                            <div className="flex justify-between w-full flex-wrap mt-8">
                                <div>
                                    <p>Subscriber name</p>
                                    <span>John Doe</span>
                                </div>
                                <div>
                                    Group #: XXXXXX
                                </div>
                            </div>
                            <p className='my-8'>ID #: XXXXXXXXXX</p>
                            <div className='absolute -bottom-3 -right-3 cursor-pointer'>
                                <FaPlusCircle
                                    size={70}
                                    color={'rgb(97 156 138)'}
                                />
                            </div>
                        </div>}
                            <p className='-mt-5 w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mx-2 text-center'>Take a Front Page Photo of Your Government ID Card
                                from Camera</p>
                        </> :
                        <>
                            <img src={images.front} alt="Front Image Uploaded" className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mb-5 rounded-2xl' />
                            <Button 
                                text='Retake photo' 
                                className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mx-auto btn tonal-btn' 
                                onClick={() => { setUploadImage({ type: 'front', open: true }); setImages({ ...images, front: '' }) }} 
                                icon={{position:'right', icon:<MdOutlineFlipCameraAndroid />}} 
                            />
                        </>
                    }
                    <p className='text-lg uppercase'>(Front card)</p>
                </div>
            </div>
            <div className='mt-4 flex justify-center'> 
                <Divider className='divider w-8/12' orientation='horizontal' flexItem/>
            </div>
            {uploadImage.open && uploadImage.type === 'back' && <div className='flex w-full justify-center mt-4'>
                <div className='flex justify-center w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12'>
                    <WebCam firstName={form.firstName + ' ' + form.lastName} onClose={() => setUploadImage({ open: false, type: '' })} onChange={imageUploaded} />
                </div>
            </div>}
            <div className='flex w-full justify-center mb-10'>
                <div className='w-full flex justify-center flex-col items-center'>
                    {!images.back ?
                        <>
                            {uploadImage.type !== 'back' &&
                                <div className='rounded-3xl bg-slate-200 w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 p-5 m-10 relative cursor-pointer' onClick={() => setUploadImage({ type: 'back', open: true })}>
                                    <p className='text-lg font-semibold'>GOVERNMENT ID</p>
                                    <hr className='w-8/12 border-1 border-black mt-6' />
                                    <hr className='w-8/12 border-1 border-black mt-4' />
                                    <hr className='w-8/12 border-1 border-black mt-4' />

                                    <hr className='w-8/12 ml-auto border-1 border-black mt-10' />
                                    <hr className='w-8/12 ml-auto border-1 border-black mt-4' />
                                    <hr className='w-8/12 ml-auto border-1 border-black mt-4 mb-10' />

                                    <div className='absolute -bottom-3 -right-3 cursor-pointer'>
                                        <FaPlusCircle
                                            size={70}
                                            color={'rgb(97 156 138)'}
                                        />
                                    </div>
                                </div>}
                            <p className='-mt-5 w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mx-2 text-center'>Take a Front Page Photo of Your Government ID Card
                                from Camera</p>
                        </>
                        :
                        <>
                            <img src={images.back} alt="Front Image Uploaded" className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mb-5 rounded-2xl mt-4' />
                            <Button 
                                className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mx-auto btn tonal-btn' 
                                onClick={() => { setUploadImage({ type: 'back', open: true }); setImages({ ...images, back: '' }) }} 
                                text='Retake photo'
                                icon={{position:'right', icon:<MdOutlineFlipCameraAndroid />}}
                                />
                        </>
                    }
                    <p className='text-lg uppercase'>(Back card)</p>
                </div>
            </div>
            <div className="flex justify-center">
                <Button 
                    onClick={() => 
                    images.front && images.back ? imageUploaded('completed') : 
                    Close()
                    }
                    text={images.front && images.back ? 'SAVE' : 'RETURN'}
                    className={`btn w-11/12 sm:w-10/12 md:w-10/12 lg:w-7/12 mb-4 ${(images.front && images.back) ? 'fill-btn' : 'outline-btn'}`} 
                />
            </div>
        </>
  )
}

export default GovtProof