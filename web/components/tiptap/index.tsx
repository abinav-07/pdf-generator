import React from "react";
import { EditorContent, useEditor, Editor, Extension, } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import EditorMenu from "./components/editorMenu";

const TiptapEditor = ({
  className = "",
  placeholder = "What is in your head?",
  displayImageMenu = false,
  showMenubar = false,
  returnHTMLType = false,
  setImage,
  image,
  ...props
}: any) => {
  const CustomParagraph = Extension.create({
    name: "customParagraph",

    addKeyboardShortcuts() {
      return {
        Enter: () => this.editor.commands.insertContent("<br>"),
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      CustomParagraph,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    parseOptions: {
      preserveWhitespace: "full",
    },

    onUpdate: ({ editor }: any) => {
      const html = returnHTMLType ? editor.getHTML() : editor.getText();
      props.onChange(html);
    },
  }) as Editor;


  return (
    <div className={className} {...props}>
      <EditorMenu
        editor={editor}
        displayImageMenu={displayImageMenu}
        showMenubar={showMenubar}
        setImage={setImage}
        image={image}
        {...props}
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
