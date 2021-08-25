import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";

const ImageModal = ({ children, photo }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        open={open}
        className=" image-modal"
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <img
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          alt={photo.title}
        />
      </Modal>
    </>
  );
};

export default ImageModal;
