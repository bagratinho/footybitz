import React from 'react';
import Header from './containers/Header';
import CssBaseline from '@material-ui/core/CssBaseline';

const Main: React.FC = () => {
  return (
    <div className="app-main-wrapper">
      <CssBaseline/>
      <Header/>
      {/* <HeroBanner/>
      <HowToPlay/>
      <Leaderboard/>
      <Rules/>
      <Footer/> */}
    </div>
  );
}

export default Main;
