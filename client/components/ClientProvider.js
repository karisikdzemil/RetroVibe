"use client";

import { Provider } from "react-redux";
import { store } from "@/app/store";
import InitUser from "@/app/InitUser";
import Header from "./Header";

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <InitUser />
      <Header />
      <main>{children}</main>
    </Provider>
  );
}
