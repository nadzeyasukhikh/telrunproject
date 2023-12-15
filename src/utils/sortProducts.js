

export const sortProducts = (products, sortValue) => {
    let sortedProducts = [...products];

    switch (sortValue) {
        case "newest":
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case "highToLow":
            sortedProducts.sort((a, b) => {
                const priceA = a.discont_price !== null ? a.discont_price : a.price;
                const priceB = b.discont_price !== null ? b.discont_price : b.price;
                return priceB - priceA;
            });
            break;
        case "lowToHigh":
            sortedProducts.sort((a, b) => {
                const priceA = a.discont_price !== null ? a.discont_price : a.price;
                const priceB = b.discont_price !== null ? b.discont_price : b.price;
                return priceA - priceB;
            });
            break;
        default:
            break;
    }

    return sortedProducts;
};