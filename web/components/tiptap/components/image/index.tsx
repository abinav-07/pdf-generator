import { Editor } from "@tiptap/react";
import { Button, Form, Input, Row, Typography } from "antd";
import React, { ChangeEvent, useState } from "react";
import { ImagePopupWrapper } from "./style";


interface ImageMenuProps {
    editor: Editor;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

type InputEvent = ChangeEvent<HTMLInputElement>

export const AddImageLink = ({ editor, setModal }: ImageMenuProps) => {

    const [input, setInput] = useState("");

    const handleChange = (e: InputEvent) => {
        setInput(e.target.value);
    };

    const setlink = (url: string) => {
        editor.chain().focus().setImage({ src: url }).run();
        //   Inserting a line break
        editor.chain().focus().insertContent('<br>').run();
    };

    const handleSubmit = (e: any, url: string) => {
        setlink(url);
        setModal(false);
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
                    <Input onChange={(e) => handleChange(e)} />
                    <Button
                        className="image-modal-submit"
                        type="primary"
                        onClick={(e) => handleSubmit(e, input)}
                    >
                        Add
                    </Button>
                </div>
            </ImagePopupWrapper>
        </div >
    );
};
