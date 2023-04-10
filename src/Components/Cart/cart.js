
import React,{useContext} from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartcntx = useContext(CartContext);

  const totalAmount = cartcntx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemAddHandler =(item) => {
    cartcntx.addItem({...item,quantity: 1});

  }

  const cartItemRemoveHandler =(item) => {
    

    cartcntx.removeItem(item);

  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartcntx.items.map((item) => (
    
        <CartItem
        key={item.id}
        name={item.name}
        amount={item.quantity}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}  onClick={props.onClose}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;