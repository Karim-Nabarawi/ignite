import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesActions";

//Components
import Game from "../components/Game";
import GameDetail from "../components/GameDetail";
//Styling and Animation
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const Home = (params) => {
  //Get current location
  const location = useLocation().pathname;
  const pathID = location.split("/")[2];

  //Fetch games from API
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  //Get the fetched data from Redux and assign it
  const { popular, newGames, upcoming, searched } = useSelector((state) => state.games);

  return (
    <GameList>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>{pathID && <GameDetail pathID={pathID} />}</AnimatePresence>
        {searched.length ? <ShowGames title="Searched Games" data={searched} /> : ""}
        <ShowGames title="Upcoming Games" data={upcoming} />
        <ShowGames title="Popular Games" data={popular} />
        <ShowGames title="New Games" data={newGames} />
      </AnimateSharedLayout>
    </GameList>
  );
};

const ShowGames = ({ title, data }) => {
  return (
    <>
      <h2>{title}</h2>
      <Games>
        {data.map((game) => (
          <Game name={game.name} released={game.released} image={game.background_image} id={game.id} key={game.id} />
        ))}
      </Games>
    </>
  );
};

// Styles
const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Home;
