import { Input, Modal, } from "antd";
import React, { ChangeEvent, useState } from "react";

interface ImageMenuProps {
  showModal: boolean
  image?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

type InputEvent = ChangeEvent<HTMLInputElement>;

export const AddImageLinkModal = ({ showModal, setShowModal, image, setImage }: ImageMenuProps) => {
  const [input, setInput] = useState(image || "");

  const handleChange = (e: InputEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInput(e.target.value);
  };

  const setLink = () => {
    if (setImage) {
      setImage(input);
    }
    setShowModal(false);
    return;
  };

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <Modal
      title="Add Image" open={showModal} onOk={setLink} onCancel={handleCancel}
    >
      <Input value={input} onChange={handleChange} />
    </Modal>
  );
};
