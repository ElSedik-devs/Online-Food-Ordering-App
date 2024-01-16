import { createContext, useReducer } from "react";

const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{}
    ,clearCart:()=>{}
});

function CartReducer(state,action){
    if(action.type==='ADD_ITEM'){
        const existingItem=state.items.findIndex(
            (item)=>item.id===action.item.id
        );
        const updatedItems=[...state.items];
        if(existingItem>-1){
            const updatedItem={
            ...state.items[existingItem],
            quantity:state.items[existingItem].quantity+1
            }
            updatedItems[existingItem]=updatedItem;
        }else{
            updatedItems.push({...action.item,quantity:1});
        }
        return {...state,items:updatedItems};
    }

    if(action.type==='REMOVE_ITEM'){
        const existingItem=state.items.findIndex(
            (item)=>item.id===action.id
        );
        console.log(existingItem +" hello " );
        const existingCartItem=state.items[existingItem];
        const updatedItems=[...state.items];
        // console.log(existingCartItem  );
        if(existingCartItem.quantity===1){
            updatedItems.splice(existingCartItem,1);
        }else{
            const updatedItem={
                ...existingCartItem,
                quantity: existingCartItem.quantity-1
            };
            updatedItems[existingCartItem]=updatedItem;
        
        }
        return {...state,items:updatedItems};
    }
    if(action.type==='CLEAR_CART'){
        return {...state,items:[]};
    }
    return state;


}

export function CartContextProvider({children}){

   const[cart,dispatchCartAction]= useReducer(CartReducer,{items:[]});

    
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM',item});
    }
    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM',id});
    }
    function clearCart(){
        dispatchCartAction({type:'CLEAR_CART'});
    }
    const cartContext={
        items:cart.items,
        addItem,
        removeItem,clearCart
    }
    
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;