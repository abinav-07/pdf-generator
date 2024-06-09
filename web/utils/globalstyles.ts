import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  .content-header{
    background: #fff;
    align-items: center;
    display:flex;
    justify-content: space-between;
    border-bottom: 2px solid #c7cdd4;
    margin-bottom:5px;
  }
  `;

export { GlobalStyles };
