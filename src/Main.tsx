import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="app-main-wrapper">
      <Header/>
      <HeroBanner/>
      <HowToPlay/>
      <Leaderboard/>
      <Rules/>
      <Footer/>
    </div>
  );
}

export default Main;
