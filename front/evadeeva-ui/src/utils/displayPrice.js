const currencyFormat = (product) => {
        
    product = product.toString();
    product = product.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    
    return product;
}
export default currencyFormat;