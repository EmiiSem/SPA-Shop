import React, { useState, useEffect} from "react"
import { API_KEY, API_URL} from "../config"
import { Preloader } from "./Preloader"
import { GoodsList } from "./GoodsList"

import { Cart } from "./Cart"
import { BasketList } from "./BasketList"
import { Alert } from "./Alert"

function Main() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setIsBasketShow] = useState(false)
    const [alertName, setAlertName] = useState("")


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY
            }
        }).then(response => response.json()).then(data => {
            data.shop && setGoods(data.shop.slice(0, 12))
            setLoading(false)
        })
    }, [])

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })

            setOrder(newOrder)
        }
        setAlertName(item.name)

    }

    const removeToBasket = (itemId) => {
        const newOrder = order.filter(element => element.id !== itemId)
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setIsBasketShow(!isBasketShow)
    }

    const handleIncrement = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newInc = el.quantity + 1
                return {
                    ...el,
                    quantity : newInc
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const handleDecrement = (itemId) => {
        const newOrder = order.map(el => {
            if(el.id === itemId) {
                const newDec = el.quantity - 1
                return {
                    ...el,
                    quantity: newDec >= 0 ? newDec : 0
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const closeAlert = () => {
        setAlertName("");
    }
    
    return (
        <main className="main container">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {
                loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />
            }
            {
                isBasketShow && <BasketList order={order}
                handleBasketShow={handleBasketShow}
                removeToBasket={removeToBasket}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                />
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert} />
            }
        </main>
    )
}

export { Main }