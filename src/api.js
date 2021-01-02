//Base URL
const base_url = "https://api.rawg.io/api";

//Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};

const getCurrentDay = () => {
  const day = new Date().getDay() + 1;
  return day < 10 ? `0${day}` : day;
};

//Popular games
const popular_games = "https://api.rawg.io/api/games?dates=2020";
