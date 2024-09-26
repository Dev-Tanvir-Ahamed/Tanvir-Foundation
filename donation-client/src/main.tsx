import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { router } from "./routes/routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
      <ToastContainer />
    </Provider>
  </StrictMode>
);
