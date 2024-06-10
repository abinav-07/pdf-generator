import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  FileImageOutlined,
  ItalicOutlined,
  PicCenterOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Editor } from "@tiptap/react";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { AddImageLink } from "./image";

interface EditorMenuProps {
  editor: Editor;
  displayImageMenu?: boolean;
  showMenubar?: boolean;
  image?: string
  setImage?: React.Dispatch<React.SetStateAction<string>>;
}

const EditorMenu = ({ editor, displayImageMenu, showMenubar, image, setImage }: EditorMenuProps) => {
  if (!editor) {
    return null;
  }

  const [imageModal, setImageModal] = useState<boolean>(false);

  useEffect(() => {
    const handleMenuButtonClick = (event: any) => {
      event.preventDefault();
    };

    // Add event listeners to elements with 'menu-button' class
    const menuButtons = document.querySelectorAll(".menu-button");
    menuButtons.forEach((button) => {
      button.addEventListener("click", handleMenuButtonClick);
    });

    return () => {
      // Cleanup event listeners on component unmount
      menuButtons.forEach((button) => {
        button.removeEventListener("click", handleMenuButtonClick);
      });
    };
  }, []);

  const handleUndo = useCallback(() => {
    editor.chain().focus().undo().run();
  }, [editor]);

  const handleRedo = useCallback(() => {
    editor.chain().focus().redo().run();
  }, [editor]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleHeading = (level: any) => () => {
    editor.chain().focus().toggleHeading({ level: level }).run();
  };

  const handleAlignment = (alignment: string) => () => {
    editor.chain().focus().setTextAlign(alignment).run();
  };

  return (
    <div>
      <div className="menu">
        {showMenubar ?
          <>
            <button
              className="menu-button"
              onClick={handleUndo}
              disabled={!editor.can().undo()}
            >
              <RotateLeftOutlined />
            </button>
            <button
              className="menu-button"
              onClick={handleRedo}
              disabled={!editor.can().redo()}
            >
              <RotateRightOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive("bold"),
              })}
              onClick={toggleBold}
            >
              <BoldOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive("underline"),
              })}
              onClick={toggleUnderline}
            >
              <UnderlineOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive("italic"),
              })}
              onClick={toggleItalic}
            >
              <ItalicOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ level: 1 }),
              })}
              onClick={handleHeading(1)}
            >
              <h6>H1</h6>
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ level: 2 }),
              })}
              onClick={handleHeading(2)}
            >
              <h6>H2</h6>
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ level: 3 }),
              })}
              onClick={handleHeading(3)}
            >
              <h6>H3</h6>
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ level: 4 }),
              })}
              onClick={handleHeading(4)}
            >
              <h6>H4</h6>
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ textAlign: "left" }),
              })}
              onClick={handleAlignment("left")}
            >
              <AlignLeftOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ textAlign: "right" }),
              })}
              onClick={handleAlignment("right")}
            >
              <AlignRightOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ textAlign: "center" }),
              })}
              onClick={handleAlignment("center")}
            >
              <AlignCenterOutlined />
            </button>
            <button
              className={classNames("menu-button", {
                "is-active": editor.isActive({ textAlign: "justify" }),
              })}
              onClick={handleAlignment("justify")}
            >
              <PicCenterOutlined />
            </button>
          </>
          : ""}
        <div onMouseLeave={() => setImageModal(false)}>
          {displayImageMenu && (
            <button
              onClick={() => setImageModal(true)}
              className="menu-button"
            >
              <FileImageOutlined />
            </button>
          )}
          {imageModal && (
            <AddImageLink setModal={setImageModal} image={image} setImage={setImage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorMenu;
