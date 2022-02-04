import styled from "styled-components";

// export const DivContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: space-between;
//     flex-wrap: wrap;
// `;


export const FormGroup = styled.div`
	color: palevioletred;
    padding: 1rem;
    border-radius: 3px;
    background-color: white;    
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    min-width: 200px;
    max-width: 30%;
    min-height: 70px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 10px;
    `;

export const Label = styled.label`
    padding: 1rem;
	margin-bottom: 0.5em;
	color: palevioletred;
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 0.5em;

    `;


export const Input = styled.input`
	padding: 0.5em;
	color: palevioletred;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	margin-bottom: 0.5em;
    width: 100%;
    padding: 0.5em;
    margin: 0.5em;
`;

export const FormInput = styled.input`
	background: papayawhip;
	border-radius: 3px;
	margin-bottom: 0.5em;
    max-width: 65%;

`;

export const Message = styled.label`
	margin-bottom: 0.5em;
	color: palevioletred;
`;

export const Form = styled.form`
    color: palevioletred; 
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
`;

