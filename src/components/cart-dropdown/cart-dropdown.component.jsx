import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selector";
import CartItem from "../cart-item/cart-item.component";
import { CartDropdownContainer, CartDropdownButton, EmptyMessageContainer, CartItemsContainer } from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, dispatch }) =>
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />) : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>;

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
