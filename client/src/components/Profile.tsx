import React, { useEffect, useState } from "react";
import RouteCard from "./RouteCard";
import RouteInterface from "../interfaces/RouteInterface.ts";
//import User from "../interfaces/User";
import styles from "../styles/Main.module.css";

const Profile: React.FC<{ user: string }> = ({ user }) => {
  const [data, setData] = useState<RouteInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pref`);
        const jsonData: RouteInterface[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  if (user) {
    return (
      <>
        <h1>{user}'s Profile</h1>
        <h3>
          This is your profile. Here you can store some paths that you like.
        </h3>
        <div className={styles.routesContainer}>
          <ul>
            {data.map((route) => (
              <li key={route.id}>
                <RouteCard route={route} user={user} />
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
};

export default Profile;
