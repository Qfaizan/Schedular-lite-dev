import { Divider } from "@mui/material";
import { validateForm } from "../commonFunctions";
import config from "../config";
import { handleDilogModal, setModal, updateForm } from "../redux/formReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
interface props{
    type:string;
    className?:string;
    handleValidate?:any;
}
const CheckBoxItems:React.FC<props> = ({ type, handleValidate, className=''}) => {
  const dispacth = useAppDispatch();
  const state = useAppSelector((state: any) => state);
  const { form, submit } = state.form;
  if(type==='NoInsurance')
	return (
		<div>
		<input
			type="checkbox"
			id="iDontHaveInsurance"
			onChange={(e) => {
			if (e.target.checked) {
				dispacth(
				updateForm({
					paymentMethod: 'No Insurance',
					hasInsurance: false,
					paymentIntentId: '',
					iDontHaveInsurance: true
				})
				);
			} else {
				dispacth(
				updateForm({ paymentMethod: '', iDontHaveInsurance: false, termsAndConditions:false })
				);
			}
			}}
			className={className}
		/>
		<label
			htmlFor="iDontHaveInsurance"
			className={`ml-2 cursor-pointer`}
		>
			I Don't have a Insurance
		</label>
		</div>
	);
  if(type==='termsAndConditions' && form?.location?.schedularLite?.hippaInfo !== 'Disable')
  return (
		<>
			<input
				type="checkbox"
				id="checkBox"
				onChange={(e) =>
                    {
                        if(form.termsAndConditions){
                            dispacth(updateForm({termsAndConditions:e.target.checked}))
                        }
                        else{
                            if(validateForm(form, true))
                                dispacth(
                                    setModal({
                                        type: "consent",
                                        open: true,
                                        title: "HIPAA Release & Informed Consent",
                                    })
                                )
                            else
                                dispacth(handleDilogModal({open:true,title:'Alert',body:handleValidate(form)}))
                        }
                    }
				}
                checked={form?.termsAndConditions ?? false}
				className="mt-5 mb-6"
			/>
			<label htmlFor="checkBox" className={`ml-2 cursor-pointer ${submit && !form.termsAndConditions && `text-red-600`}`}>
				Agree our{" "}
				<a
                    rel="noreferrer"
					target="_blank"
					href={config.termsAndConditions}
					className="font-semibold">
					Terms and Conditions.
				</a>
			</label>
            <Divider className='divider' orientation='horizontal' flexItem/>
		</>
	)
	return <></>
};

export default CheckBoxItems;
