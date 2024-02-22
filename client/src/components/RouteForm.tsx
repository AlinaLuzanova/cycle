import * as React from "react";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../styles/FormVoyages.module.css";
import { useNavigate } from "react-router-dom";

type FormType = {
  title: string;
  description: string;
  city: string;
  start: string;
  finish: string;
  longway: number;
  firstPoint: string;
  secondPoint: string;
};
const VoyageForm: FC = () => {
  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
    city: "",
    start: "",
    finish: "",
    longway: 0,
  });

  const [firstPoint, setFirstPoint] = useState<string>("");
  const [secondPoint, setSecondPoint] = useState<string>("");

  useEffect(() => {
    const getMap = async () => {
      const map = new mapgl.Map("container", {
        center: [37.668598, 55.76259],
        zoom: 13,
        key: "7e7fd46b-03ab-48d0-8fc4-3332f9dbb216",
      });

      const directions = new mapgl.Directions(map, {
        // This key can be used for demo purpose only!
        // You can get your own key on http://partner.api.2gis.ru/
        // f5a825fc-f1fa-4991-b9bc-3b6a344f8508
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
        setFirstPoint("");
        setSecondPoint("");
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
          setFirstPoint(JSON.stringify(firstPoint));
        } else if (selecting === "b") {
          secondPoint = coords;
          selecting = "end";
          setSecondPoint(JSON.stringify(secondPoint));
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleSubmitForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, firstPoint, secondPoint }),
      });
      const res = await data.json();
      if (res.id) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <h3 className={styles.title_form}>Create own route!</h3>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <Box
            onSubmit={handleSubmitForm}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className={styles.wrapper_form}>
              <TextField
                onChange={handleChange}
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                id="form_title"
                label="Title"
                name="title"
                value={form.title}
                variant="standard"
              />
              <TextField
                onChange={handleChange}
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                id="form_city"
                label="City"
                name="city"
                value={form.city}
                variant="standard"
              />
              <TextField
                onChange={handleChange}
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                id="form_start"
                label="From"
                name="start"
                value={form.start}
                variant="standard"
              />
              <TextField
                onChange={handleChange}
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                id="form_finish"
                label="To"
                name="finish"
                value={form.finish}
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                id="form_longway"
                label="Distance"
                name="longway"
                value={form.longway}
                variant="standard"
              />

              <TextField
                onChange={handleChange}
                id="standard-multiline-flexible"
                sx={{
                  backgroundColor: "#FFF",
                  borderRadius: "5px",
                  paddingInline: "3%",
                  paddingBlock: "1%",
                }}
                label="Multiline"
                name="description"
                value={form.description}
                multiline
                rows={4}
                variant="standard"
              />

              <Button
                sx={{ m: 1, width: "40ch" }}
                variant="contained"
                type="submit"
              >
                Create route
              </Button>
            </div>
            <div id="container" className={styles.map}></div>
          </Box>
        </div>
      </div>
    </div>
  );
};
export default VoyageForm;
