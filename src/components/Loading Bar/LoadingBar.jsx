// src/components/LoadingBar.js
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";

const TopLoadingBar = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const ref = useRef(null);

  useEffect(() => {
    if (isLoading) {
      ref.current?.continuousStart(30); // Start loading to 30%
    } else {
      ref.current?.complete(); // Finish loading
    }
  }, [isLoading]);

  return <LoadingBar color="#8BC34A" ref={ref} />;
};

export default TopLoadingBar;
