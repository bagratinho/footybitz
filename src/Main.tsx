import React from 'react';
import Header from './containers/Header';
import SliderTest from './containers/SliderTest';
import HeroBanner from './containers/HeroBanner';
import CssBaseline from '@material-ui/core/CssBaseline';
import HowToPlay from 'containers/HowToPlay';

const Main: React.FC = () => {
  return (
    <div className="app-main-wrapper">
      <CssBaseline></CssBaseline>
      {/* <Header/>
      <HeroBanner/>
      <HowToPlay/> */}
      {/* <Leaderboard/>
      <Rules/>
      <Footer/> */}
      <SliderTest/>
    </div>
  );
}

export default Main;
