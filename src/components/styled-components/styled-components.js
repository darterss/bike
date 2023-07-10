import styled from "styled-components";

export const Form = styled.form`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10%;
      @media only screen and (max-width: 375px) {
        font-size: 13px;
      }
`

export const Input = styled.input`
      margin: 1% 10px;
  @media only screen and (max-width: 375px) {
    font-size: 13px;
    width: 110px
  }
`

export const InputCheckbox = styled.input`
  width: 183px;
  @media only screen and (max-width: 375px) {
    width: 131px
  }
`

export const Select = styled.select`
      margin: 1% 10px;
  width: 170px;
  @media only screen and (max-width: 375px) {
    font-size: 13px;
    width: 118px
  }
`

export const Label = styled.label`
      display: flex;
      justify-content: space-around;
      text-align: start;
`

export const Button = styled.button`
      margin: inherit;
`