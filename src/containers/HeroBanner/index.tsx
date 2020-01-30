import * as React from 'react';
import styled from 'styles/styled-components';

export interface IHeroBannerProps {
  className?: string;
}

export default class HeroBanner extends React.Component<IHeroBannerProps> {
  public render() {
    return (
      <StyledHeroBanner >
      </StyledHeroBanner>
    );
  }
}


const StyledHeroBanner = styled.section`
  background: url(https://images.unsplash.com/photo-1544366981-43d8d59eeba9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80);
  height: 400px;
  background-size: 100% auto;
  background-position: 0 -270px;
  background-repeat: no-repeat;
  filter: grayscale(0.8);
`;