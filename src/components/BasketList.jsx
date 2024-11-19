import { BasketItem } from "./BasketItem"

function BasketList(props) {
    const {order = [],
        handleBasketShow = Function.prototype,
        removeToBasket = Function.prototype,
        handleIncrement={handleIncrement},
        handleDecrement={handleDecrement}
    } = props
    const totalPrice =order.reduce((sum, el) => {
        return sum + el.pricing * el.quantity
    }, 0)

    return <ul className="collection dropdown-basket">
        <li className="collection-item active"><b>Корзина</b></li>
        {
            order.length ? order.map(item => (
                <BasketItem key={item.id} {...item}
                removeToBasket={removeToBasket}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement} />
            )) : <li className="collection-item">В корзине ничего нет</li>
        }
        <li className="collection-item active">
            <b>Итого:</b> {totalPrice} руб
            <button className="btn indigo darken-4 secondary-content btn-small btn__add">Оформить заказ</button>
            </li>
        <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
    </ul>
}

export { BasketList }