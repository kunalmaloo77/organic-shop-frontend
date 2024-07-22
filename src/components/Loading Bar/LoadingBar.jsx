// src/components/LoadingBar.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

const TopLoadingBar = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(30); // Start with 30% to give the user immediate feedback
    } else {
      setProgress(100); // Complete the loading bar
    }
  }, [isLoading]);

  return (
    <LoadingBar
      color="#8BC34A"
      progress={progress}
      onLoaderFinished={() => setProgress(0)} // Reset the progress after completion
    />
  );
};

export default TopLoadingBar;
