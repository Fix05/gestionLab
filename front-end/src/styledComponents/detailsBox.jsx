import styled from 'styled-components'


export const EmployeeData = styled.div`
background-color: rgb(226 232 240);
margin-top: 24px;
border-radius: 8px;
border-width: 2px;
border-color: rgb(156 163 175);

`

export const Container = styled.div`
max-height: 360px;
overflow: scroll;
overflow-x: hidden;


&::-webkit-scrollbar {
    width: 6px;
}

&::-webkit-scrollbar-thumb {
    background-color: #48627c;
    border-radius: 5px;
  }
`
export const Div = styled.div`
background-color: white;
padding: 30px;
display: flex;
flex-wrap: wrap;
width: 94%;
z-index: 6000;
margin: 15px 30px 30px 30px;
border: solid 2px;
border-color: rgb(156 163 175);
border-radius: 10px;
`

export const Info = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
${props => props.flexbasis ? (`flex-basis: ${props.flexbasis};`) : 'flex-basis: calc(25% - 10px);'}
flex-grow: 1;
margin: 5px;
`

