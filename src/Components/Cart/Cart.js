import React,{ useContext, useState } from "react";
import "./Cart.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `RS ${cartCtx.totalAmount}`;
    const hasItems = cartCtx.items.length > 0;   

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
         setIsSubmiting(true);
           await fetch("https://food-order-app-27d46-default-rtdb.firebaseio.com/orders.json", {
              method: "POST",
              body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items      
              })
         });
          setIsSubmiting(false);
          setDidSubmit(true);
          cartCtx.clearCart();
    }

   const cartItems = <ul className="cart-items"> 
        {cartCtx.items.map((item) => 
        <CartItem
           key={item.id} 
           name={item.name}
           amount={item.amount}
           price={item.price}
           onRemove={cartItemRemoveHandler.bind(null, item.id)}
           onAdd={cartItemAddHandler.bind(null, item)}     
        />
        )} 
        </ul>
      
      const modalAction =  <div className="actions">
      <button className="button--alt" onClick={props.onClose}>Cancel</button>
      {hasItems && <button className="button" onClick={orderHandler}>Order</button>}
  </div>

     const cartModalContent =
      <React.Fragment>
            {cartItems}
        <div className="total">
           <span>Total Amount</span>
           <span>{totalAmount}</span>
        </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
            {!isCheckout && modalAction }
     </React.Fragment>

     const isSubmitingModalContent = <p>Sending Order Data...</p>

     const didModalSubmitContent = 
              <React.Fragment>
                    <p>Successfully sent the order</p>
                    <div className="actions">
                    <button className="button" onClick={props.onClose}>Cancel</button>
                    </div>
              </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmitingModalContent}
            {!isSubmiting && didSubmit && didModalSubmitContent}
        </Modal>
        
    );
};

export default Cart;