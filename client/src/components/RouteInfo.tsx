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
import type { YMapLocationRequest } from "ymaps3";

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
      await ymaps3.ready;

      const LOCATION: YMapLocationRequest = {
        center: [37.623082, 55.75254],
        zoom: 9,
      };

      const { YMap, YMapDefaultSchemeLayer } = ymaps3;

      const map = new YMap(document.getElementById("app"), {
        location: LOCATION,
      });
      map.addChild(new YMapDefaultSchemeLayer({}));
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
        <div id="app" className={styles.map}></div>
      </div>
    </>
  );
};

export default RouteInfo;
