import * as React from 'react';
import styled from 'styles/styled-components';

export interface IHeroBannerProps {
  className?: string;
}

class HeroBanner extends React.Component<IHeroBannerProps> {
  public render() {
    return (
      <section className={this.props.className}>
      </section>
    );
  }
}


const StyledHeroBanner = styled(HeroBanner)`
  background: #333;
  height: 500px;
`;

export default StyledHeroBanner;