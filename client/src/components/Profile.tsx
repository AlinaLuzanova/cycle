import React, { useEffect, useState } from "react";
import RouteCard from "./RouteCard.tsx";
import RouteInterface from "../interfaces/RouteInterface.ts";
import styles from "../styles/Main.module.css";

interface ProfileProps {
    user: string; // Ожидаем строку в качестве пропса user
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
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
if(user){
    return (
        <div className={styles.main}>
            <h1>{user}'s Profile</h1>
            <h3>This is your profile. Here you can store some paths that you like.</h3>
            <div className={styles.routesContainer}>
                <ul>
                    {data.map((route) => (
                        <li key={route.id}>
                            <RouteCard route={route} user={{ id: 1, email: user }} /> {/* Передаем user как email в объекте */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

};

export default Profile;
