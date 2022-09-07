import React from 'react';
import styled from 'styled-components';
import { Breakpoints } from '../utils';
import Scrollbar from './Scrollbar';

const Container = styled.div`
  height: 300px;

  @media (min-width: ${Breakpoints.sm}px) {
    height: 250px;
  }
`;

const Subheader = styled.p`
  margin-bottom: 15px;
  color: rgba(38, 38, 38, 0.8);
  font-weight: 700;
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

const Content = styled.div`
  padding-right: 15px;
`;
const ScrollableDynamicConsent = ({consent}:any) => {          
  return (
    <Container>
      <Scrollbar>
        <Content>
          <Subheader>
            {consent.subHead1}
          </Subheader>
          {consent.subHead1Content?.map((data:any) => (
            <Text>
              {data}
            </Text>
          ))}
           <Text>
            {consent.subHead1SubContent1}
            {consent.subHead1SubContent1List?.map((data:any) => (
            <ul>
              <li dangerouslySetInnerHTML={{__html: data}} />
            </ul>
            ))}
            {consent.subHead1SubContent2}
            {consent.subHead1SubContent2List?.map((data:any) => (
            <ul>
              <li>
                {data}
              </li>
            </ul>
            ))}
            {consent.subHead1SubContent3}
          </Text>
          <Subheader>{consent.subHead2}</Subheader>
          {consent.subHead2Content?.map((data:any) => (
            <Text>
              {data}
            </Text>
          ))}
          <Subheader>{consent.subHead3}</Subheader>
          {consent.subHead3Content?.map((data:any) => (
            <Text>
              {data}
            </Text>
          ))}
        </Content>
      </Scrollbar>
    </Container>
  );
};

export default ScrollableDynamicConsent;
