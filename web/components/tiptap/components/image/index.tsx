import { Editor } from "@tiptap/react";
import { Button, Form, Input, Row, Typography } from "antd";
import React, { ChangeEvent, useState } from "react";
import { ImagePopupWrapper } from "./style";

interface ImageMenuProps {
  image?: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

type InputEvent = ChangeEvent<HTMLInputElement>;

export const AddImageLink = ({ setModal, image, setImage }: ImageMenuProps) => {
  const [input, setInput] = useState(image || "");

  const handleChange = (e: InputEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInput(e.target.value);
  };

  const setlink = () => {
    if (setImage) {
      setImage(input);
    }
    setModal(false);
    return;
  };

  return (
    <div>
      <ImagePopupWrapper>
        <Row justify={"space-between"} style={{ marginBottom: "5px" }}>
          <Typography.Text>Add Image URL</Typography.Text>
          <Button
            onClick={() => setModal(false)}
            className="image-modal-button"
          >
            X
          </Button>
        </Row>
        <div className="image-form">
          <Input value={input} onChange={handleChange} />
          <Button
            className="image-modal-submit"
            type="primary"
            onClick={setlink}
          >
            Add
          </Button>
        </div>
      </ImagePopupWrapper>
    </div>
  );
};
