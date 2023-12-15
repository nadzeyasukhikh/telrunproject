
export const calculateDiscountPercent = (discountPrice, originalPrice) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};