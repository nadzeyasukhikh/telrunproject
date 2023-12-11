import { useSelector } from "react-redux";



function FilledShoppingCart(){
    const cartItems = useSelector((state) => state.products.cartItems);
    return (
        <div>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        {/* Add other product details here */}
                        <button className="addedToCart">Added</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    )
}

export default FilledShoppingCart