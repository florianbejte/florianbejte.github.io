// florian arsal bejte ekfu24/1 20240035
const favorites = [
    "Stranger Things",
    "Black mirror",
    "The Witcher 3",
    "Cyberpunk 2077",
    "League of Legends"
];

favorites.sort((a, b) => b.localeCompare(a));
console.log(favorites[0]);
