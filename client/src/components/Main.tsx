import React, { useState, useEffect } from "react";
import styles from "../styles/Main.module.css";
import RouteCard from "./RouteCard";
import Spline from "@splinetool/react-spline";
import RouteInterface from "../interfaces/RouteInterface";
import SideBar from "./SideBar";
//import User from "../interfaces/User";
interface SearchParams {
  city: string;
  start: string;
  finish: string;
  distance: number;
}

const Main: React.FC<{ user: string }> = ({ user }) => {
  const [data, setData] = useState<RouteInterface[]>([]);
  const [searchResult, setSearchResult] = useState<RouteInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/routes");
        const jsonData: RouteInterface[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (formData: SearchParams) => {
    try {
      const response = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resJson = await response.json();
      console.log(resJson); // Добавим вывод ответа для отладки
      if (response.ok) {
        // Проверим успешность запроса
        setSearchResult(resJson); // Убедимся, что resJson содержит результаты поиска
      } else {
        console.error("Request failed with status:", response.status); // Выведем ошибку, если запрос не удался
      }
    } catch (error) {
      console.error("Error during search:", error); // Обработаем другие ошибки
    }
  };

  return (
    <div className={styles.main}>
      <h1>Our latest routes</h1>
      <div className={styles.earth}>
        <Spline scene="https://prod.spline.design/SS9q7mlzF7LmdE8f/scene.splinecode" />
      </div>
      <h2>explore world with OnRoad</h2>
      <div className={styles.content}>
        <div className={styles.upperContent}>
          <h3>Find your next adventure!</h3>
          <hr
            style={{
              height: ".4em",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          />
        </div>
        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <SideBar onSubmit={handleSubmit} />
          </div>
          <div className={styles.routesContainer}>
            <ul>
              {searchResult.length > 0
                ? searchResult.map((route) => (
                    <li key={route.id}>
                      <RouteCard route={route} user={user} />
                    </li>
                  ))
                : data.map((route) => (
                    <li key={route.id}>
                      <RouteCard route={route} user={user} />
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
