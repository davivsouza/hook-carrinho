import styled from 'styled-components'
import {darken} from 'polished'
export const Container = styled.main`
  
  margin-top: 30px;
`;

export const Carts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 18px;
`;

export const CartItem = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  text-align: left;

  img{
    display: block;
    align-self: center;
  }

  p{
    font-weight: 500;
    margin: 8px 0;
    line-height: 20px;
  }

  strong{
    font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
  }
  .cart-quantity{
    font-weight: 400;
  }

  button{
    background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        svg {
          margin-right: 5px;
        }
      }
      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  
`;