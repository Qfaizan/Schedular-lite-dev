import React from 'react'
import styled from 'styled-components';
import { colors,Breakpoints } from './styles/colors';
import Checkbox from './Checkbox';
import ScrollableDynamicConsent from './ScrollableDynamicConsent';
import ScrollableDynamicHippa from './ScrollableDynamicHippa';
import { updateForm } from '../redux/formReducer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button from './Button';
interface ContainerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    noPadding?: boolean;
    marginTop?: boolean;
  }


  
const Container = styled.div`
  margin: 0 auto;
  max-width: ${({ size }: ContainerProps) => {
    if (size === 'md') {
      return '760px';
    }

    if (size === 'lg') {
      return '920px';
    }

    if (size === 'xl') {
      return '1110px';
    }

    if (size === 'xxl') {
      return '1400px';
    }

    return '650px';
  }};
  margin-top: ${({ marginTop }: ContainerProps) => (marginTop ? '40px' : '0px')};
  padding: ${({ noPadding }: ContainerProps) => (noPadding ? '0px' : '0 15px')};
`;
const Content = styled.div`
  padding: 30px 30px;

  @media (min-width: ${Breakpoints.md}) {
    padding: 88px 0;
  }
  @media (max-width: ${Breakpoints.sm}px) {
    padding: 0px 0px 10px 0px !important;
    
  }
`;
const PageHeader = styled.div`
  margin-bottom: 20px;
`;
const PageTitle = styled.h2`
  color: ${colors.fullBlack};
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  text-align: left;

  @media (max-width: ${Breakpoints.sm}px) {
    font-size: 25px;
    margin-top: 0%;
  }
`;
const Info = styled.div`
  background: ${colors.blue8};
  padding: 20px 30px;
  margin-bottom: 20px;

  @media (min-width: ${Breakpoints.md}px) {
    padding: 30px 40px;
  }
`;
const InfoTitle = styled.h3`
  color: rgba(38, 38, 38, 0.8);
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  margin: 0 0 20px 0;
  color: ${colors.blueLight};
`;

const InfoContent = styled.p`
  margin: 10px 0px;
`;

const Space = styled.div`
  height: 30px;

  @media (min-width: ${Breakpoints.md}px) {
    height: 40px;
  }
`;

const Consent =({consentContent, close}:any) => {
    const dispacth = useAppDispatch();
    const {form} = useAppSelector((state:any)=>state.form)
    const css = (!form?.agreeContent || !form?.agreeTestedConsent || !(form?.agreeAssignment || !form.hasInsurance)) ? 'px-4 py-2 rounded-md text-white bg-gray-500 cursor-not-allowed' : 'px-4 py-2 rounded-md text-white bg-sky-500 cursor-pointer'
    return (<Container size="md">
       <Content>
        <PageHeader>
          <PageTitle>HIPAA Release & Informed Consent</PageTitle>
        </PageHeader>
        
              <Info>
                <InfoTitle>HIPAA Confirmation</InfoTitle>
                <InfoContent>
                {/* HippaRelease */}
                  <ScrollableDynamicHippa hasInsurance={false} email ={form.email ?? ''} hippaContent = {consentContent?.HippaRelease ?? {}} cPartnerID={form?.location?.schedularLite?.hippaInfo !== 'Disable' ?form?.location?.schedularLite?.hippaInfo: 'WSL001'}  
                   />
                </InfoContent>
              </Info>
              <Checkbox
                name="hipaaConfirmed"
                isRequired
                defaultCheck={form?.agreeContent ?? false}
                onChange={(checked:any) =>dispacth(updateForm({agreeContent:checked}))}
              >
                I agree to the contents of the HIPAA authorization.
              </Checkbox>
              <Space />
              <Info>
                <InfoTitle>
                  Informed consent for COVID-19 Diagnostic Testing
                </InfoTitle>
                <InfoContent>
                  {/* {airline === 'HAL' ? (
                    <ScrollableConsent />
                  ) : (
                    testSelection === 'general' ?
                    <ScrollableGeneralConsent /> :
                    <ScrollableAirlineConsent />
                  )} */}
                    {/* consent */}
                    <ScrollableDynamicConsent consent={consentContent?.consent ?? {}}
                />
                </InfoContent>
              </Info>
              <Checkbox
                name="consentForTesting"
                isRequired
                defaultCheck={form?.agreeTestedConsent ?? false}
                onChange={(checked:any) =>dispacth(updateForm({agreeTestedConsent:checked}))}
              >
                I give my consent to be tested for COVID-19.
              </Checkbox>

              {/*Signature and new insurance consent */}
              { form.hasInsurance && (
                <>
                  <Space />
                  <Info>
                    <InfoTitle>Assignment of Insurance Benefits</InfoTitle>
                    <InfoContent>
                {/* HippaRelease */}

                      <ScrollableDynamicHippa hasInsurance={true}  email = 'KCBINDU@gmail.com' hippaContent = {consentContent?.HippaRelease ?? {}}/>
                    </InfoContent>
                  </Info>
                  <Checkbox
                    name="insuranceForTesting"
                    isRequired
                    defaultCheck={form.agreeAssignment ?? false}
                    onChange={(checked) =>dispacth(updateForm({agreeAssignment:checked}))}
                  >
                    I agree to the assignment of insurance benefits
                  </Checkbox>
                  <Space />
                </>
              )}
              <div style={{display:'flex',justifyContent:'end'}}>
                <Button text={'Agree'} onClick={()=>{dispacth(updateForm({termsAndConditions:true})); close()}} disabled={!form?.agreeContent || !form?.agreeTestedConsent || !(form?.agreeAssignment || !form.hasInsurance)} className='btn shadow-lg font-semibold fill-btn'/>
              </div>
      </Content>
  </Container>
  )
}

export default Consent