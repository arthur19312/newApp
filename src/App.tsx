import { hot } from "react-hot-loader";
import React from "react";
import { Icon, Provider } from "sugar-design";
import styles from "./App.module.less";
import RequestList from "./components/RequestList";

const App = () => {
  return (
    <Provider value={{ theme: "blue" }}>
      <div className={styles.ca}>
        HELloolo WORllLd!1!
        <Icon name="add" />
        <RequestList />
      </div>
    </Provider>
  );
};
export default hot(module)(App);
