function GoodsItem(props) {
    const {
        mainId: id,
        displayName: name,
        displayDescription: description,
        price,
        displayAssets,
        addToBasket = Function.prototype
    } = props;

    // Извлекаем full_background из первого объекта массива displayAssets
    const fullBackground = displayAssets?.[0]?.full_background;

    return (
        <div className="card">
            <div className="card-image">
                {
                    fullBackground
                        ? <img src={fullBackground} alt={name} />
                        : <img src={`https://placehold.jp/300x400.png?text=${name}`} alt={name} />
                }
            </div>
            <div className="card-content">
                <p>{description || "Описание отсутствует"}</p>
            </div>
            <div className="card-action">
                <button
                    className="btn indigo darken-4"
                    onClick={() => addToBasket({
                        id,
                        name,
                        pricing: price?.finalPrice || 0 // Безопасная проверка на цену
                    })}
                >
                    Купить
                </button>
                <span className="right" style={{ fontSize: "18px" }}>
                    {price?.finalPrice || "0"} руб.
                </span>
            </div>
        </div>
    );
}

export {GoodsItem}