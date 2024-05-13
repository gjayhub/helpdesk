import React from "react";
import { deleteUser } from "./action";

const DeleteBtn = () => {
  return (
    <form action={deleteUser}>
      <button type="submit">delete</button>
    </form>
  );
};

export default DeleteBtn;
