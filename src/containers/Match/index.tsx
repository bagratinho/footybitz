import * as React from "react";
import styled from "styles/styled-components";
import { NumberInput } from "containers/Interface/NumberInput";
import Dictionary from "components/Dictionary";
import { Button } from "@material-ui/core";

export interface IMatchProps {
  // homeTeamLogo: string;
  // homeTeamName: string;
  // awayTeamLogo: string;
  // awayTeamName: string;
  // league: string;
  // kickOfDate: Date;
  // score?: number[];
  // prediction?: number[];
  // points?: number;
}

export default class Match extends React.PureComponent<IMatchProps> {
  public render() {
    return (
      <StyledContainer>
        <div className="info">
          League: Spain, La Liga Santander - Hour: 14:00
        </div>
        <div className="details">
          <div className="team">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/paYnEE8hcrP96neHRNofhQ_96x96.png" alt=""/>
            Barcelona
          </div>
          <div className="outcome">
            <div className="label">
              <Dictionary label="yourPrediction"/>
            </div>
            <div className="prediction">
              <NumberInput/>
              -
              <NumberInput/>
            </div>
          </div>
          <div className="team">
            <img src="https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png" alt=""/>
            Real Madrid
          </div>
        </div>
      </StyledContainer>
    );
  }
}


const StyledContainer = styled.div`
  background-color: #4d4b62;
  color: #f4f6fe;
  /* border: solid 1px #5f5c7b; */
  margin-bottom: 16px;
  & .info {
    border-bottom: solid 1px #5f5c7b;
    font-size: 12px;
    text-align: center;
    padding: 8px 16px;
  }
  & .details {
    display: flex;
    justify-content: space-evenly;
    padding: 32px 16px;
    & .team {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      justify-content: center;
      & > img {
        display: block;
        margin-bottom: 10px;
        height: 64px;
      }
    }
    & .outcome {
      display: flex;
      flex-direction: column;
      & .label {
        line-height: 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        background: #5e5c7b;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
      }
      & .prediction {
        display: flex;
        width: 150px;
        align-items: center;
        justify-content: space-between;
        font-size: 30px;
      }
    }
  }
`