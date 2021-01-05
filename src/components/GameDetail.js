import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//utility
import { smallImage } from "../util";

//Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

//IMAGES
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
//Star Images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathID }) => {
  const history = useHistory();
  //Exit Details
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };

  //Get Star Rating
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 0; i < 5; i++) {
      stars.push(<img src={i < rating ? starFull : starEmpty} key={i} alt="star" />);
    }
    return stars;
  };
  //Get Platform Image
  const getPlatform = (platform) => {
    return (
      {
        "PlayStation 4": playstation,
        "PlayStation 5": playstation,
        "Xbox Series S/X": xbox,
        "Xbox S": xbox,
        "Xbox One": xbox,
        "Nintendo Switch": nintendo,
        PC: steam,
        iOS: apple,
      }[platform] || gamepad
    );
  };

  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" layoutId={pathID} onClick={exitDetailHandler}>
          <Detail>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathID}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => (
                    <div className="tooltip" key={data.platform.id}>
                      <img src={getPlatform(data.platform.name)} alt={data.platform.name} />
                      <span className="tooltiptext">{data.platform.name}</span>
                    </div>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img layoutId={`image ${pathID}`} src={smallImage(game.background_image, 1280)} alt={game.name} />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery">
              {screen.map((screen) => (
                <img src={smallImage(screen.image, 1280)} key={screen.id} alt="game" />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
  .tooltip {
    position: relative;
    display: flex;
    justify-content: space-evenly;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    top: 130%;
    left: 25%;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
