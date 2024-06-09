import React from 'react';
import { EditorContent, useEditor, Editor, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from "@tiptap/extension-underline";
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Link from "@tiptap/extension-link";
import EditorMenu from './components/editorMenu';

const TiptapEditor = ({ className = '', placeholder = "What is in your head?", displayImageMenu = false, ...props }) => {

    const CustomParagraph = Extension.create({
        name: 'customParagraph',

        addKeyboardShortcuts() {
            return {
                Enter: () => this.editor.commands.insertContent('<br>'),
            }
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
            Underline,
            Link,
            CustomParagraph,
            Heading.configure({
                levels: [1, 2, 3, 4],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],

                alignments: ['left', 'center', 'right', 'justify'],
            }),
            Image.configure({
                allowBase64: true,
                inline: true
            }),
            Placeholder.configure({
                placeholder,
            }),

        ],
        parseOptions: {
            preserveWhitespace: "full",
        },
        onUpdate: ({ editor }: any) => {
            const html = editor.getHTML();
            props.onChange(html)
        },
    }) as Editor;

    return (
        <div className={className} {...props}>
            <EditorMenu editor={editor} displayImageMenu={displayImageMenu} {...props} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
