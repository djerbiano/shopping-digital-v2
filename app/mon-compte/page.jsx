"use client";
import { useState } from "react";
import MyAccount from "../_Components/clientSide/MyAccount";
import Login from "../_Components/clientSide/Login";

export default function MonCompte() {
  const [auth, setAuth] = useState(false);
  return auth ? <MyAccount /> : <Login />;
}
