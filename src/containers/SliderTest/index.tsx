import * as React from 'react';
import styled from 'styles/styled-components';
import ContentSlider, { Slide } from "components/ContentSlider";

export interface ISliderTestProps {
}

export default class SliderTest extends React.PureComponent<ISliderTestProps, { stepIndex: number }> {
  constructor(props: ISliderTestProps) {
    super(props);
    this.state = {
      stepIndex: 0,
    }
  }

  public render() {
    return (
      <StyledContainer>
        <div className="wrapper">
          <ContentSlider
            currentSlideIndex={this.state.stepIndex}
            width={400}
            transitionDuration={500}
          >
            <Slide render={this.firstSlide}/>
            <Slide render={this.secondSlide}/>
            <Slide render={this.thirdSlide}/>
          </ContentSlider>
        </div>
        <div className="actions">
          <div className="previous" onClick={this.prevSlide}>
            PREVIOUS
          </div>
          <div className="next" onClick={this.nextSlide}>
            NEXT
          </div>
        </div>
      </StyledContainer>
    );
  }

  private nextSlide = () => {
    if (this.state.stepIndex === 2) { return }
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    });
  }

  private prevSlide = () => {
    if (this.state.stepIndex === 0) { return }
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    });
  }

  private firstSlide = () => (
    <div className="first">
      I'm the first slide <br/><br/>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </div>
  )

  private secondSlide = () => (
    <div className="second">
      I'm the second slide <br/><br/>
      I'm a bit longer then the previous one
      <br/><br/>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </div>
  )

  private thirdSlide = () => (
    <div className="third">
      Well, I'm the biggest of my brothers <br/>
      Seriously! <br/>
      Not joking! <br/><br/>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat quae possimus, nostrum debitis repellat repudiandae eaque dolorum deleniti cum aliquam suscipit, quod animi. Voluptate magni qui, adipisci earum neque sint?
    </div>
  )
}

const StyledContainer = styled.div`
  background: #00405c;
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 30px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  & div.wrapper {
    box-shadow: 0 0 0 10px #56508c;
    background: #56508c;
    border-radius: 5px;
    overflow: hidden;
  }
  & div.actions {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    width: 400px;
    padding: 20px 0;
    & > div {
      cursor: pointer;
    }
  }
  & .first {
    background: #bb5191;
    padding: 20px;
  }
  & .second {
    background: #fe6464;
    padding: 20px;
  }
  & .third {
    background: #fea702;
    padding: 20px;
  }
`;

