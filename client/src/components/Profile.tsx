import React, {useEffect, useState} from "react";
//import styles from "./styles/Profile.module.css";
import User from '../interfaces/User';
import {Route} from "react-router-dom";
import styles from "../styles/Main.module.css";
import RouteCard from "./RouteCard.tsx";
import RouteInterface from '../interfaces/RouteInterface.ts';
const Profile: React.FC = () => {

    const [data, setData] = useState<RouteInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/saved");
                const jsonData: RouteInterface[] = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return(
        <div>
<h1>Profile</h1>
            <h3>This is your profile. Here you can store some paths that you like.</h3>
            <div className={styles.routesContainer}>
                <ul>
                    {data.map((route) => (
                        <li key={route.id}>
                            <RouteCard route={route} user={{ id: 1, email: 'user' }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Profile;
