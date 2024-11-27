import { useContext } from "react";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";

function MealItem(props) {
   const cartCtx = useContext(CartContext);
   const price = `Rs.${props.price.toFixed(2)}`;

   const addToCartHandler = amount => {
        cartCtx.addItem({
             id: props.id,
             name: props.name,
             amount: amount,
             price: props.price
        });  
   }; 

    return (
          <li className="meal">
            <div>
                <h3>{props.name}</h3>
                <div className="description">{props.description}</div>
                <div className="price">{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
          </li>
    );
};

export default MealItem;