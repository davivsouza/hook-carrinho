import styled from 'styled-components'
import {Link} from 'react-router-dom'
export const Container = styled.header`
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  
`;

export const Cart = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  span{
    color: #ccc;
    font-size: 14px;
  }
`