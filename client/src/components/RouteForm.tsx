import * as React from "react";
import { ChangeEvent, FC, FormEvent } from "react";
import type { YMapLocationRequest } from "ymaps3";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "../styles/FormVoyages.module.css";

type FormType = {
  title: string;
  description: string;
  city: string;
  start: string;
  finish: string;
  longway: number;
};
const VoyageForm: FC = () => {
  const [form, setForm] = React.useState<FormType>({
    title: "",
    description: "",
    city: "",
    start: "",
    finish: "",
    longway: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const data = await fetch("http://localhost:3000/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const res = await data.json();
      if (res.id) {
        // event.target.reset();

        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  // async function initMap(): Promise<void> {
  //   await ymaps3.ready;

  //   const LOCATION: YMapLocationRequest = {
  //     center: [37.623082, 55.75254],
  //     zoom: 9,
  //   };

  //   const { YMap, YMapDefaultSchemeLayer } = ymaps3;

  //   const map = new YMap(document.getElementById("app"), {
  //     location: LOCATION,
  //   });
  //   map.addChild(new YMapDefaultSchemeLayer({}));
  // }

  // initMap();

  return (
    <>
      <h3 className={styles.title_form}>Create own route!</h3>
      <Box
        onSubmit={handleSubmitForm}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className={styles.wrapper_form}>
          <TextField
            onChange={handleChange}
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
            id="form_title"
            label="Title"
            name="title"
            value={form.title}
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
            id="form_city"
            label="City"
            name="city"
            value={form.city}
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
            id="form_start"
            label="From"
            name="start"
            value={form.start}
            variant="standard"
          />
          <TextField
            onChange={handleChange}
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
            id="form_finish"
            label="To"
            name="finish"
            value={form.finish}
            variant="standard"
          />

          <TextField
            onChange={handleChange}
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
            id="form_longway"
            label="Distance"
            name="longway"
            value={form.longway}
            variant="standard"
          />

          <TextField
            onChange={handleChange}
            id="standard-multiline-flexible"
            sx={{ backgroundColor: "#FFF", borderRadius: "10px" }}
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
      </Box>
      {/* <div id="app" style={{ width: "600px", height: "400px" }}></div> */}
      {/* <div id="map" style={{ width: "600px", height: "400px" }}></div> */}
    </>
  );
};
export default VoyageForm;
