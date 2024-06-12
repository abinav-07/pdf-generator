import styled from "styled-components";

export const Wrapper = styled.div`
    .generator-modal{
        top:20px;
        
        /* Style for the editor container */
        .editor{
            position: relative;
            width: 100%;
        }
        .tiptap {
            border: 1px solid black;
            border-bottom-right-radius:5px;
            border-bottom-left-radius:5px;  
            border-top:1px solid #c7cdd4;
            padding:5px;
            overflow:auto;
            max-height: 200px;
        }
        .ProseMirror {
            top:-3px;
            padding: 8px 8px 8px;
            border: 2px solid gray;
      
            &:focus-visible {
              border-color: #007bff;
              box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
              outline: none;
            }      
        }
        /* Editor Placeholder CSS */
        .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
        }

        .tiptap-body{
            .tiptap{
                height:40vh;
                overflow:auto;
            }
        }

        /* Style for the menu contents */
         
        .menu {
            z-index: 1;
        
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0;
            padding: 10px;
            overflow-x:auto;
        
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            border: 1px solid grey;
            border-bottom: none;
            background-color: white;
            color: grey;
            .menu-button {
            display: flex;
            align-items: center;
            justify-content: center;
            
            height: 32px;
            
            margin: 0;
            padding: 0 8px;
            
            border: 0;
            border-radius: 4px;
            background: transparent;
            
            white-space: nowrap;
            cursor: pointer;
        }
    
        .menu-button:hover,
        .menu-button.is-active {
            background-color: #c7cdd4;
            color: black;
        }
    }
`;
