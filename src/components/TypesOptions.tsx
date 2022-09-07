/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from 'react';
import { Heading } from './Heading';
import { handleDilogModal, setModal } from '../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Divider } from '@mui/material';
import CheckBoxItems from './CheckBox';
import config from '../config';
const TypesOptions = ({ optionTypeFor }: any) => {
  const dispacth = useAppDispatch();
  const { form }: any = useAppSelector((state) => state.form);
  const { location } = form;
  if (optionTypeFor === 'address') {
    const ENTER_ADDRESS_MANUALLY =
      location?.schedularLite?.address?.address ?? false;
    const PROVIDE_GOVT_PROOF =
      location?.schedularLite?.address?.drivingLicence ?? false;
    if (!(ENTER_ADDRESS_MANUALLY || PROVIDE_GOVT_PROOF)) {
      return (
        <>
          <div className="pt-1">
            <Heading
              title={'There is No Address Options Available for this Location'}
              center={true}
            />
          </div>
          <Divider className="pt-6 divider" orientation="horizontal" flexItem />
        </>
      );
    }

    return (
      <>
        {ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF && (
          <Heading title={optionTypeFor} />
        )}
        <div
          className={`flex justify-between items-center ${
            !(ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF) ? 'mt-2' : ''
          }`}
        >
          {!(ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF) && (
            <Heading title={optionTypeFor} />
          )}
          {ENTER_ADDRESS_MANUALLY && (
            <div>
              <button
                type="button"
                onClick={() =>
                  dispacth(
                    setModal({
                      open: true,
                      type: 'address',
                      title: 'Enter Address',
                    })
                  )
                }
                className={`uppercase font-bold typeOptions p-4  h-20 min-w-min shadow-md flex justify-center items-center ${
                  form.isAddress &&
                  !(form.govtIdBackCard || form.govtIdFrontCard)
                    ? 'bg-dark text-white'
                    : 'btn outline-btn'
                }`}
              >
                Add Address
              </button>
            </div>
          )}
          {ENTER_ADDRESS_MANUALLY && PROVIDE_GOVT_PROOF && (
            <div className="font-bold text-lg">OR</div>
          )}
          {PROVIDE_GOVT_PROOF && (
            <div>
              <button
                type="button"
                className="disabled:opacity-75"
                onClick={() =>
                  dispacth(
                    setModal({
                      open: true,
                      type: 'govtProof',
                      title: 'Upload Government Proof',
                    })
                  )
                }
              >
                {/* <img
                  className="h-20 shadow-md rounded-md"
                  src={config.GovtProofImage}
                  alt="Image Not Found"
                /> */}
              </button>
            </div>
          )}
        </div>
        {(ENTER_ADDRESS_MANUALLY || PROVIDE_GOVT_PROOF) && (
          <Divider className="pt-4 divider" orientation="horizontal" flexItem />
        )}
      </>
    );
  }
  if (optionTypeFor === 'Payment Method') {
    const CREDIT_CARD = location?.schedularLite?.payment?.credit;
    const ENTER_INSURANCE_DETAILS = location?.schedularLite?.payment?.insurance;
    const ALLOW_NO_INSURANCE = form?.location?.schedularLite?.noInsurance;
    if (ENTER_INSURANCE_DETAILS || CREDIT_CARD || ALLOW_NO_INSURANCE)
      return (
        <>
          {ENTER_INSURANCE_DETAILS && CREDIT_CARD && (
            <Heading title={optionTypeFor} />
          )}
          <div
            className={`flex justify-between items-center ${
              !(ENTER_INSURANCE_DETAILS && CREDIT_CARD) ? 'mt-4' : ''
            }`}
          >
            {!(ENTER_INSURANCE_DETAILS && CREDIT_CARD) && (
              <Heading title={optionTypeFor} />
            )}

            {ENTER_INSURANCE_DETAILS && (
              <div>
                <button
                  type="button"
                  disabled={form?.iDontHaveInsurance}
                  onClick={() =>
                    dispacth(
                      setModal({
                        open: true,
                        type: 'insurance',
                        title: 'Your Insurance',
                      })
                    )
                  }
                  className={`uppercase w-36 font-bold typeOptions p-4  h-20 min-w-min shadow-md flex justify-center items-center ${
                    form?.payingMethod === 'Insurance'
                      ? 'bg-dark text-white'
                      : `btn outline-btn${form?.iDontHaveInsurance ? '-d' : ''}`
                  }`}
                >
                  Add Insurance Details
                </button>
              </div>
            )}
            {ENTER_INSURANCE_DETAILS && CREDIT_CARD && (
              <div className="font-bold text-lg">OR</div>
            )}
            {CREDIT_CARD && (
              <div>
                <button
                  type="button"
                  disabled={form?.iDontHaveInsurance}
                  className="disabled:opacity-75 disabled:cursor-not-allowed"
                  onClick={() =>
                    dispacth(
                      setModal({ open: true, type: 'payment', title: '' })
                    )
                  }
                >
                  <img
                    className="h-20  rounded-md disabled:opacity-5 disabled:cursor-not-allowed"
                    src={config.CreditCardImage}
                    alt="Image Not Found"
                  />
                </button>
              </div>
            )}
            {!(ENTER_INSURANCE_DETAILS || CREDIT_CARD) && (
              <CheckBoxItems type="NoInsurance" />
            )}
          </div>
          {(ENTER_INSURANCE_DETAILS || CREDIT_CARD) && ALLOW_NO_INSURANCE && (
            <CheckBoxItems type="NoInsurance" className="mt-6" />
          )}
          {(ENTER_INSURANCE_DETAILS || CREDIT_CARD || ALLOW_NO_INSURANCE) && (
            <Divider
              className="pt-4 divider"
              orientation="horizontal"
              flexItem
            />
          )}
        </>
      );
    else return <></>;
  }
  return <></>;
};

export default TypesOptions;
