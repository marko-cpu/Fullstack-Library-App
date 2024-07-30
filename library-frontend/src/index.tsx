import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


const stripePromise = loadStripe('pk_test_51NhsdDIPOdGk0m8BvEUtnsF7Zkgny8bc2GXzsqShNZDDIOvhh6Yca4bbkDOz1RzGta3kXnbs5qa1xDPIJr4KMWrL008130fl1l');

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  
    <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </BrowserRouter>
  
);

