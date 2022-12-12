import React from "react";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Trello = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { workplaceInfo } = userLogin;

  return (
    <>
      <Header />
    </>
  );
};

export default Trello;
