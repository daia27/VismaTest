export function getFavorites() {
    const favoritesRaw = localStorage.getItem("favorites");

    let favorites = [];
    if (favoritesRaw) {
        favorites = JSON.parse(favoritesRaw);
    }

    return favorites;
}