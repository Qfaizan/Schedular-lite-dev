import React, { useState } from 'react';
import {AiOutlineCamera, AiOutlineCloudUpload} from 'react-icons/ai';
import {MdOutlineFlipCameraAndroid} from 'react-icons/md';
import {IoMdArrowRoundBack} from 'react-icons/io'
import Webcam from 'react-webcam';
import { RiCameraSwitchLine } from 'react-icons/ri';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import Button from './Button';
interface Props {
firstName:string;
onClose: () => void;
onChange:(url:string)=>void;
}
const WebCam: React.FC<Props> = ({ firstName, onClose,onChange }) => {
const [URL, setURL] = useState('');
const [loading, setLoading] = useState(false);
const [switchCamra, setSwitchCamra] = useState<boolean>(false);
const switchCam = () =>setSwitchCamra(!switchCamra); 
const [devices, setDevices] = React.useState<boolean>(true);
const dataURLtoFile = (dataurl: any, filename: any) =>{
    var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
    while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
const uploadImage = async (e: any) => {
    try {
        const fileName: any = `B-insurance-or-govt-${firstName}-${Date.now()}`;
        var file = dataURLtoFile(e, fileName);
        const storageRef = ref(storage);
        const imagesRef = ref(storageRef, 'images');
        const fileref = ref(imagesRef, file.name);
        const uploadTask = await uploadBytes(fileref, file)
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/tiff-fx' ||
            file.type === 'image/tiff'
        ) {
            const url: string = await getDownloadURL(uploadTask.ref);
            onChange(url)
            onClose();
            setLoading(false);
            setURL('');
        }
    } catch (e) {
        console.log('Camera Error',e);
    }
};
const webcamRef: any = React.useRef(null);
const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if(imageSrc!==null)
        setURL(imageSrc);
}, [webcamRef]);
const saveImage=()=>{
    setLoading(true);
    uploadImage(URL);
}
const backCamera = {
    facingMode: { exact: "environment" }
};
const frontCamera = {
    facingMode: "user"
  };

return (
    <div style={{ textAlign: 'center' }}>
        {URL!==''?
        (<>
            <img src={URL} alt='No Preview' style={{display:"block",marginLeft:"auto",marginRight:"auto"}}/>
            <div className='mt-2 flex justify-center gap-2 mb-6'>
                <Button 
                    text="Retake photo" 
                    disabled={loading} 
                    className={`w-1/2 shadow-lg btn outline-btn`} 
                    onClick={()=>setURL('')}
                    icon={{position:'right',icon:<MdOutlineFlipCameraAndroid/>}}
                />
                <Button 
                    text={loading?'Uploading...':'Upload'}
                    disabled={loading} 
                    className={`w-1/2  shadow-lg btn fill-btn`} 
                    onClick={saveImage}
                    icon={{position:'right',icon:<AiOutlineCloudUpload />}}
                />
            </div>
        </>)
            :
        (
        <>
            {
                devices&&
                <div onClick={switchCam} style={{textAlign:'right',paddingRight:'4.5%',cursor:'pointer'}}>
                    <RiCameraSwitchLine size={30} />
                </div>
            }
            <Webcam
                videoConstraints={devices?switchCamra?frontCamera:backCamera:frontCamera}
                width={'100%'}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                marginHeight={5}
                marginWidth={5}
                imageSmoothing={true}
                screenshotQuality={1}         
                onUserMediaError={(err:any)=>{
                    setDevices(false);
                }}
            />
            <div className='mt-2 flex justify-center gap-2 mb-6'>
                <Button 
                    text="Back" 
                    className={`w-1/2 btn shadow-lg outline-btn`} 
                    onClick={onClose}
                    icon={{position:'left',icon:<IoMdArrowRoundBack/>}}
                />
                <Button 
                    text="Capture photo" 
                    className={`w-1/2 btn shadow-lg fill-btn`} 
                    onClick={capture}
                    icon={{position:'right',icon:<AiOutlineCamera />}}
                />
            </div>
        </>
        )}
    </div>
);
};
export default WebCam;
