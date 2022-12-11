import React from "react";
import Header from "../components/Header";
import Workplace from "../components/Workspace";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Trello = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { workplaceInfo } = userLogin;

  return (
    <>
      {!workplaceInfo ? (
        <Box>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>
      ) : (
        <>
          <Header />
          <Workplace />
        </>
      )}
    </>
  );
};

export default Trello;
