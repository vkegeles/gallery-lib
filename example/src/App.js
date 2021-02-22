import React from 'react';
import MyGallery from 'gallery-lib';
import feed from './feed.json';
import 'gallery-lib/dist/index.css';

const App = () => {
  return (
    <MyGallery
      feed={require('./feed.json')}
      search='true'
      results-per-page='15'
    />
  );
};

export default App;
