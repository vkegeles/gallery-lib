import React from 'react';
import MyGallery from 'gallery-lib';
import feed from './feed.json';
import 'gallery-lib/dist/index.css';

const App = () => {
  // return (
  //   <MyGallery
  //     feedPath='data/feed.json'
  //     search={true}
  //     results-per-page={10}
  //     pagination={true}
  //   />
  // );
  // const feed = [];
  return (
    <MyGallery
      feedArray={feed}
      results-per-page={15}
      sorting={true}
      search={true}
      pagination={true}
    />
  );
};

export default App;
