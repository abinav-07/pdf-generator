import styled from "styled-components";

export const ImagePopupWrapper = styled.div`
    border: 1px solid #949fab;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    background-color: white;
    top: -40px;
    padding:10px;
    min-width:200px;
    border-radius: 5px;
    .ant-form-item{
        margin:0;
    }
    .image-modal-button{
        height: 22px;
        width: 18px;
        position: absolute;
        justify-content: center;
        right: 5px;
        background-color:red;
        color:white;
    }
    .image-modal-submit{
        position: absolute;
        right: 5px;
        top: 36px;
        z-index:10;
    }
    .image-modal-button, .image-modal-submit {
        z-index: 10; 
        pointer-events: auto; 
    }
`