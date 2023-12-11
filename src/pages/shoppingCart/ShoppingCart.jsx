import { useSelector } from "react-redux"
import EmptyShoppingCart from "../../components/emptyShoppingCart/EmptyShoppingCart"
import FilledShoppingCart from "../../components/filledShoppingCart/FilledShoppingCart"

function ShoppingCart (){
    const cartItems = useSelector((state) => state.products.cartItems)
    return(
        <div>
            {cartItems.length > 0 ? <FilledShoppingCart /> : <EmptyShoppingCart />}
        </div>
    )
}

export default ShoppingCart