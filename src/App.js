import React from "react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import MaterialUi from "./styles/MaterialUi";

const App = () => {
  return (
    <Provider store={store}>
      <MaterialUi>
        <Routes />
      </MaterialUi>
    </Provider>
  );
};

export default App;
