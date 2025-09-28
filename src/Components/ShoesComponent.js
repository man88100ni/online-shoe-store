import { useState } from "react";
import "../Styles/Style.css";

function ShoesComponent() {
    const [cartList, setCartList] = useState([]);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    const products = [
        {
            productName: "Addidas Classic Sneaker",
            productPrice: 75,
            productImage: "https://rukminim2.flixcart.com/image/2000/2000/xif0q/shoe/n/p/m/8-jp7944-8-adidas-ftwwht-ftwwht-cblack-original-imahfuftdbbgbfb6.jpeg",
        },
        {
            productName: "Puma Keftrun Sneakers For Men",
            productPrice: 89,
            productImage: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/x/t/q/-original-imah9mghsthfy9h3.jpeg",
        },
        {
            productName: "Puma BMW MMS Tune Cat Snea",
            productPrice: 48,
            productImage: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/7/z/q/-original-imah6f5hzu6jhzyw.jpeg",
        },
    ];

    const onAddToCart = (newProduct) => {
        debugger
        setCartList((existingCart) => {
            const productIndex = existingCart.findIndex((item) => item.productName === newProduct.productName);

            let updatedCart;
            if (productIndex >= 0) {
                updatedCart = existingCart.map((item, i) => i === productIndex ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                updatedCart = [...existingCart, { ...newProduct, quantity: 1 }];
            }

            updateTotal(updatedCart);
            return updatedCart;
        });
    };

    const increment = (index) => {
        debugger
        setCartList((existingCart) => {
            const updatedCart = existingCart.map((item, i) => i === index ? { ...item, quantity: item.quantity + 1 } : item);
            updateTotal(updatedCart);
            return updatedCart;
        });
    };

    const decrement = (index) => {
        debugger
        setCartList((existingCart) => {
        const updatedCart = existingCart
            .map((item, i) => i === index  ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item )
            .filter((item) => item.quantity > 0);
            updateTotal(updatedCart);
            return updatedCart;
        });
    };

    const updateTotal = (cart) => {
        debugger
        const total = cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
        setTotalCartPrice(total);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark mb-5" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Available Shoes</h1>
            <div className="row">
                {/* Products */}
                <div className="col-7">
                    <div className="row">
                        {products.map((product, index) => (
                            <div className="col-6 mb-4" key={index}>
                                <div className="card">
                                    <img src={product.productImage} alt="Product Image" className="productImage" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="product-price">${product.productPrice}</p>
                                        <button onClick={() => onAddToCart(product)}>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div className="col-5">
                    <h1 className="mb-3">Cart Items</h1>
                    <ul className="cartItems">
                        {cartList.length === 0 ? (
                            <div>
                                <h4>Your cart is empty</h4>
                                <h4>Total: $0</h4>
                            </div>
                        ) : (
                            <div>
                                {cartList.map((cartItem, index) => (
                                    <li key={index}>
                                        <div className="productImage">
                                          <img src={cartItem.productImage} alt={cartItem.productName} />
                                        </div>
                                        <div className="productName">{cartItem.productName}</div>
                                        <div className="productPrice">${cartItem.productPrice}</div>
                                        <div className="addOrRemoveProduct">
                                            <button onClick={() => decrement(index)}>-</button>
                                            {cartItem.quantity}
                                            <button onClick={() => increment(index)}>+</button>
                                        </div>
                                    </li>
                                ))}
                                <h3>Total: ${totalCartPrice}</h3>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ShoesComponent;
