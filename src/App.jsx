import { hot } from "react-hot-loader";
import React from "react";
import { Icon } from "sugar-design";
import styles from "./App.module.less";

const App = () => {
  return (
    <div className={styles.ca}>
      HELloolo WORllLd!1!
      <Icon name="add" />
    </div>
  );
};
export default hot(module)(App);
