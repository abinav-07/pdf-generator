import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  PicCenterOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Editor } from "@tiptap/react";
import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";

interface EditorMenuProps {
  editor: Editor;
}

const EditorMenu = ({
  editor,
}: EditorMenuProps) => {
  if (!editor) {
    return null;
  }



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
      </div>
    </div>
  );
};

export default EditorMenu;
