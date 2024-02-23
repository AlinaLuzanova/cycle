import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "../styles/Main.module.css";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Route {
  id: number;
  title: string;
  description: string;
  city: string;
  start: string;
  finish: string;
  longway: number;
  user_id: number;
  rating: number;
  first_point: string;
  second_point: string;
}

// interface User {
//   id: number;
//   login: string;
// }

const RouteInfo: React.FC = () => {
  const { routeId } = useParams();
  const [route, setRoute] = useState<Route>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/routes/${routeId}`);

        if (response.ok) {
          const jsonData: Route = await response.json();
          setRoute(jsonData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getMap = async () => {
      console.log("======>");
      const { first_point, second_point } = route;
      const map = new mapgl.Map("container", {
        center: JSON.parse(first_point),
        zoom: 13,
        key: "7e7fd46b-03ab-48d0-8fc4-3332f9dbb216",
      });

      const directions = new mapgl.Directions(map, {
        directionsApiKey: "7e7fd46b-03ab-48d0-8fc4-3332f9dbb216",
      });
      const markers = [];

      let firstPoint;
      let secondPoint;
      // A current selecting point
      let selecting = "a";
      const buttonText = ["Choose two points on the map", "Reset points"];

      const controlsHtml = `<button id="reset" disabled>${buttonText[0]}</button> `;
      new mapgl.Control(map, controlsHtml, {
        position: "topLeft",
      });
      const resetButton = document.getElementById("reset");

      resetButton.addEventListener("click", function () {
        selecting = "a";
        firstPoint = undefined;
        secondPoint = undefined;
        directions.clear();
        this.disabled = true;
        this.textContent = buttonText[0];
      });

      directions.pedestrianRoute({
        points: [JSON.parse(first_point), JSON.parse(second_point)],
      });
    };
    getMap();
  }, [route]);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.flexCard}>
        <Card
          sx={{
            minWidth: 300,
            borderRadius: 10,
            margin: 2,
            padding: 3,
            maxWidth: 300,
          }}
        >
          <CardContent>
            <div className={styles.cardContainer}>
              <div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {route?.city}
                  <br />
                </Typography>
                <Typography variant="h5" component="div">
                  {route?.title}
                  <br />
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Start: {route?.start}
                  <br />
                  Finish: {route?.finish}
                </Typography>
                <Typography variant="body2">
                  Rating: {route?.rating}
                  <br />
                  <Rating
                    name="half-rating"
                    className="rating"
                    defaultValue={route?.rating}
                    precision={0.1}
                    readOnly
                  />
                  <br />
                  Distance: {route?.longway}
                </Typography>
              </div>
              {/* <div className={styles.favourite}>
              {user ? (
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  style={{ color: "red" }}
                />
              ) : (
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  style={{ color: "red" }}
                  disabled
                />
              )}
            </div> */}
            </div>
          </CardContent>
        </Card>
        <div id="container" className={styles.map}></div>
      </div>
    </div>
  );
};

export default RouteInfo;
