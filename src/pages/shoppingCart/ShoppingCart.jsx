import { useSelector } from "react-redux"
import EmptyShoppingCart from "../../components/emptyShoppingCart/EmptyShoppingCart"
import FilledShoppingCart from "../../components/filledShoppingCart/FilledShoppingCart"
import { setDocumentTitle } from "../../utils/setDocumentTitle"
import { useEffect } from "react"
function ShoppingCart (){

useEffect(() => {
    setDocumentTitle("shoppingCart")
},[])


    const cartItems = useSelector((state) => state.products.cartItems)
    return(
        <div>
            {cartItems.length > 0 ? <FilledShoppingCart /> : <EmptyShoppingCart />}
        </div>
    )
}

export default ShoppingCart