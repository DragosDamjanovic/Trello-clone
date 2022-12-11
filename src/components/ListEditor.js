import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const ListEditor = () => {
  return (
    <div className="List-Title-Edit">
      <TextareaAutosize
        autoFocus
        className="list-title-textarea"
        placeholder="Enter list title..."
        // value={title}
        // onChange={handleChangeTitle}
      />
      {/* {deleteList && <i className="bi bi-x-lg" onClick={deleteList} />} */}
    </div>
  );
};

export default ListEditor;
