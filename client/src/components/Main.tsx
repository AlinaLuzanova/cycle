import React, { useState, useEffect } from "react";
import styles from '../styles/Main.module.css';
import RouteCard from "./RouteCard";
import Spline from '@splinetool/react-spline';
import RouteInterface from '../interfaces/RouteInterface.ts';
import SideBar from './SideBar';


const Main: React.FC = () => {
    const [data, setData] = useState<RouteInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/routes");
                const jsonData: RouteInterface[] = await response.json();
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
            <div className={styles.earth}>
                <Spline scene="https://prod.spline.design/SS9q7mlzF7LmdE8f/scene.splinecode" />
            </div>
            <h2>explore world with OnRoad</h2>
            <div className={styles.content}>
                <div className={styles.upperContent}>
                    <h3>Find your next adventure!</h3>
                    <hr style={{ height: '.4em', backgroundColor: 'white', borderRadius: '5px' }} />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.sidebar}>
                       <SideBar/>
                    </div>
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
            </div>
        </div>
    );
}

export default Main;
