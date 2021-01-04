import axios from "axios";
import { gameDetailsURL, gameScreenshotURL } from "../api";

//Action creator

export const loadDetail = (id) => async (dispatch) => {
  const detailData = await axios.get(gameDetailsURL(id));
  const screenData = await axios.get(gameScreenshotURL(id));

  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screen: screenData.data.results,
    },
  });
};
