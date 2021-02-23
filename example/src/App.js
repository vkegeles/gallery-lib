import React from 'react';
import MyGallery from 'gallery-lib';
import feed from './feed.json';
import 'gallery-lib/dist/index.css';

const App = () => {
  return (
    <MyGallery
      feedPath='data/feed.json'
      search={true}
      results-per-page={10}
      pagination={true}
    />
  );
  // const feed = [];
  // return <MyGallery feedArray={feed} search={true} results-per-page={10} />;
};

export default App;
