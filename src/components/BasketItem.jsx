function BasketItem(props) {
    const {
        id,
        name,
        pricing,
        quantity,
        removeToBasket = Function.prototype,
        handleIncrement={handleIncrement},
        handleDecrement={handleDecrement}
    } = props
    return <li className="collection-item">
        {name} <i className="material-icons basket-quant" onClick={() => handleIncrement(id)}>add</i> x {quantity} <i className="material-icons basket-quant" onClick={() => handleDecrement(id)}>remove</i> = {pricing * quantity} руб.
        <span className="secondary-content" onClick={() => removeToBasket(id)}><i className="material-icons basket-delete">clear</i></span>
    </li>

}

export { BasketItem }