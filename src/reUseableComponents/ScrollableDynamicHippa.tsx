import React from 'react'
import styled from 'styled-components';
import Scrollbar from './Scrollbar';
const Container = styled.div`
  height: 130px;
`;
const Text = styled.p`
  padding-left: 16px;
  margin-bottom: 20px;

  ul {
    margin: 20px 0 0;
    list-style: disc;
    padding-left: 19px;

    li {
      margin-bottom: 20px;
    }
  }
`;
const Subheader = styled.h4`
  margin-bottom: 15px;
  color: rgba(38, 38, 38, 0.8);
  font-weight: 700;
`;
const Content = styled.div`
  padding-right: 15px;
`;
const ScrollableDynamicHippa = ({hasInsurance,hippaContent,email, cPartnerID}:any) =>  {
  return (
    <Container>
      <Scrollbar>
        <Content>
        {cPartnerID !== 'KEN001'  ? (<>
                { hasInsurance === false && hippaContent.content?.map((data:any) => (
                    <Text dangerouslySetInnerHTML={{__html: data.replace('at <strong> {userData?.email}</strong>, even ', (email ?? '') ? 'at ' + (email ?? '') + ' , even ' : '. Even')}} />
                ))}
                { hasInsurance &&(
                <>
                <p><span style={{fontWeight:400}}>I hereby assign all rights to payment and benefits under my health plan to Worksite Labs, Inc. and I direct my health plan to make payments to Worksite Labs, Inc. or its affiliates for services rendered to me. I hereby designate, authorize and appoint Worksite Labs, Inc. or its assigned affiliates as an authorized representative (&ldquo;My Authorized Representatives&rdquo;) with the power to do the following:&nbsp;&nbsp;</span></p>
                <ul>
                <li style={{fontWeight:400}}><span style={{fontWeight:400}}>File and/or submit claims to my health plan (or its administrator);&nbsp;</span></li>
                <li style={{fontWeight:400}}><span style={{fontWeight:400}}>Release any information necessary to my health plan (or its administrator);&nbsp;</span></li>
                <li style={{fontWeight:400}}><span style={{fontWeight:400}}>File appeals and grievances with my health plan (or its administrator);&nbsp;</span></li>
                <li style={{fontWeight:400}}><span style={{fontWeight:400}}>Authorize my Authorized Representatives to serve as the designed representative for the purposes of appealing the denial of benefits; and&nbsp;</span></li>
                <li style={{fontWeight:400}}><span style={{fontWeight:400}}>pursue any request, disclosure, appeal or other remedy in accordance with the</span><span style={{fontWeight:400}}><br /></span><span style={{fontWeight:400}}>provisions of my health plan and my rights thereunder, including the ERISA</span><span style={{fontWeight:400}}><br /></span><span style={{fontWeight:400}}>Authorization set forth below as well as in accordance with any applicable federal and state laws.&nbsp;</span></li>
                </ul>
                <p><span style={{fontWeight:400}}>If my health plan fails to honor my assignment of benefits and payment and makes payment(s) directly to me, I agree to endorse any check(s) or payment(s) from my health plan and forward such checks or payments to My Authorized Representatives immediately upon receipt. I hereby authorize Worksite Labs, Inc. or its assigned affiliates to contact me for billing or payment purposes by phone, text message or email with the contact information that I have provided and</span></p>
                <p><span style={{fontWeight:400}}>in compliance with federal and state laws, specifically including applicable health information privacy laws. I acknowledge and agree that Worksite Labs, Inc. Has the right to request medical records, clinical/family history notes directly from my provider(s) for the purposes of insurance verification and proper billing.&nbsp;&nbsp;&nbsp;</span></p>
                <p><span style={{fontWeight:400}}>I certify that the health insurance information that I provided to My Authorized Representative is accurate as of the date set forth below and that I am responsible for keeping it updated.&nbsp;</span></p>
                <p><strong>Employee Retirement Income Security Act (&ldquo;ERISA&rdquo;) Authorization:&nbsp;</strong></p>
                <p><span style={{fontWeight:400}}>I hereby designate, authorize, and convey to My Authorized Representatives to the full extent permissible under law and under any applicable insurance policy and/or employee health care benefit plan:</span></p>
                <p>&nbsp;</p>
                <p><span style={{fontWeight:400}}>(1) the right and ability to act as my Authorized Representative in connection with</span></p>
                <p><span style={{fontWeight:400}}>any claim, right, or cause of action including litigation against my health plan (even to name me as a plaintiff in such action) that I may have under such insurance policy and/or benefit plan; and</span></p>
                <p><span style={{fontWeight:400}}>(2) the right and ability to act as my Authorized Representative to pursue such claim, right, or cause of action in connection with said insurance policy and/or benefit plan (including but not limited to, the right and ability to act as my Authorized Representative with respect to a benefit plan governed by the provisions of ERISA as provided in 29 C.F.R. &sect;2560.5031(b)(4) with respect to any healthcare expense incurred as a result of the services I received from Worksite Labs, Inc. and, to the extent permissible under the law, to claim on my behalf such benefits, claims, or reimbursement, and any other applicable remedy, including fines.</span></p>
                <p><span style={{fontWeight:400}}>I authorize communication with Worksite Labs, Inc. and its authorized representatives by email.&nbsp;</span></p>
                <p><span style={{fontWeight:400}}>A photocopy of this Assignment/Authorization shall be as effective and valid as the original.&nbsp;</span></p>
                <p><br /><br /></p>
                </>
                )}
            
            </>) : (<>
                <Text>
                    {hippaContent?.content?.title ?? ""}
                </Text>
                {
                    (hippaContent?.content?.paragraph ? hippaContent?.content?.paragraph : []).map((e:any)=>(
                        <>
                            <Subheader> {e.heading} </Subheader>
                            {e.content.map((ee:any)=>(<Text>
                                {ee}
                                </Text>
                            ))}
                        </>
                    ))
                }
            </>)}
        </Content>
      </Scrollbar>
    </Container>
  )
}

export default ScrollableDynamicHippa;