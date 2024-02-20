import React, { useState, useEffect } from "react";
import styles from '../styles/Main.module.css';
import RouteCard from "./RouteCard";

interface Route {
    id: number;
    title: string;
    description: string;
    city: string;
    start: string;
    finish: string;
    longway: number;
    user_id: number;
    rating:number;
}

const Main: React.FC = () => {
    const [data, setData] = useState<Route[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/routes");
                const jsonData: Route[] = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.main}>
            <h1>Our latest routes</h1>
            <h3>explore world with OnRoad</h3>
            <div className={styles.content}>
                <div className={styles.upperContent}>
                    <h3>Find your next adventure!</h3>
                    <hr/>
                </div>
                <div className={styles.mainContent}>
                <div className={styles.sidebar}>
                    часть Олега
                </div>
            <div className={styles.routesContainer}>
                <ul>
                    {data.map((route) => (
                        <li key={route.id}>
                            <RouteCard route={route}/>
                        </li>
                    ))}
                </ul>
            </div>
                </div>
        </div>
        </div>
    );
}

export default Main;
