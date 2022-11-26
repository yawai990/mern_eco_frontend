const CART_INITIAL_VALUE = {
    cartItems: [],
    itemsCount : 0,
    cartSubtotal : 0
}

export const counterReducer = (state = CART_INITIAL_VALUE ,action) =>{

    switch(action.type){
        case "ADD":
           const productAddToCart = action.payload;

           const productExitInCart = state.cartItems?.find((x) => x.productID === productAddToCart.productID);

           const currentState = { ...state };

           if( productExitInCart ) {
             currentState.itemsCount = 0;
             currentState.cartSubtotal = 0;
             currentState.cartItems = state.cartItems?.map(x =>{

                if( x.productID === productExitInCart.productID) {

                     currentState.itemsCount += Number(productAddToCart.quantity);
                     const sum = Number(productAddToCart.quantity) * Number(productAddToCart.price);
                     currentState.cartSubtotal += sum;

                }else {
                    currentState.itemsCount += Number(x.quantity);   
                    const sum = Number(x.quantity) * Number(x.price);
                    currentState.cartSubtotal += sum;

                }

                return x.productID === productExitInCart.productID ? productAddToCart : x;

             });

           }else {

            currentState.itemsCount =Number(productAddToCart.quantity);

            const sum = Number(productAddToCart.quantity) * Number(productAddToCart.price);

            currentState.cartSubtotal = sum;
            currentState.cartItems = [...state.cartItems, productAddToCart]
           };
         
           return currentState;  
        case "REMOVE_FROM_CART"  :

            return { ...state,
                        cartItems : state.cartItems.filter(x => x.productID !== action.payload.productID),
                        itemsCount : state.itemsCount - action.payload.quantity,
                        cartSubtotal : state.cartSubtotal - (action.payload.price * action.payload.quantity)
            }
           default : 
            return state;
        }
}