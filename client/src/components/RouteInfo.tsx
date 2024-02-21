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
      const map = new mapgl.Map("container", {
        center: [37.668598, 55.76259],
        zoom: 13,
        key: "f5a825fc-f1fa-4991-b9bc-3b6a344f8508",
      });

      const directions = new mapgl.Directions(map, {
        // This key can be used for demo purpose only!
        // You can get your own key on http://partner.api.2gis.ru/
        directionsApiKey: "f5a825fc-f1fa-4991-b9bc-3b6a344f8508",
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

      map.on("click", (e) => {
        const coords = e.lngLat;

        if (selecting != "end") {
          // Just to visualize selected points, before the route is done
          markers.push(
            new mapgl.Marker(map, {
              coordinates: coords,
              icon: "https://docs.2gis.com/img/dotMarker.svg",
            })
          );
        }

        if (selecting === "a") {
          firstPoint = coords;
          selecting = "b";
        } else if (selecting === "b") {
          secondPoint = coords;
          selecting = "end";
        }

        // If all points are selected — we can draw the route
        if (firstPoint && secondPoint) {
          directions.pedestrianRoute({
            points: [firstPoint, secondPoint],
          });
          markers.forEach((m) => {
            m.destroy();
          });
          resetButton.disabled = false;
          resetButton.textContent = buttonText[1];
        }
      });
    };
    getMap();
  }, []);

  return (
    <>
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
    </>
  );
};

export default RouteInfo;
