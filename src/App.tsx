import { hot } from "react-hot-loader";
import React, { useEffect, useState } from "react";
import { Icon, Provider } from "sugar-design";
import styles from "./App.module.less";
import RequestList from "./components/RequestList";
import MockLoading from "./components/MockLoading";

const App = () => {
  return (
    <Provider value={{ theme: "blue" }}>
      {/* <div className={styles.ca}>HELloolo WORllLd!1!</div> */}
      <div className={styles.container}>
        <RequestList />
      </div>
    </Provider>
  );
};
export default hot(module)(App);
