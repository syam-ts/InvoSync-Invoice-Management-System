import { createRoot } from "react-dom/client";
import "./style/index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
 <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}> 
                <App /> 
        </PersistGate>
    </Provider>
);
