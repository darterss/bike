export function getItemFromState(items, id, itemName){
    const index = items.findIndex((item) => item._id === id) // поиск индекса объекта в state
    const item = (index >= 0)
        ? items[index]
        : JSON.parse(localStorage.getItem(itemName)) // если обновляем страницу, state стирается, тогда берём данные из LS
    if (index >= 0) localStorage.setItem(itemName, JSON.stringify(item))
    return item
}

