import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../styles/Main.module.css';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RouteInterface from '../interfaces/RouteInterface.ts';
import User from '../interfaces/User';

const RouteCard: React.FC<{ route: RouteInterface, user: User }> = ({ route, user }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = checked
                    ? await fetch(`/save/${route.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({ route: route.id }),
                    })
                    : await fetch(`/save/${route.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({ route: route.id }),
                    });

                if (response.ok) {
                    setChecked(!checked);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [checked, route.id]);

    return (
        <div className={styles.routeCard}>
            <Card sx={{ minWidth: 300, borderRadius: 10, margin: 2, padding: 3, maxWidth: 300 }}>
                <CardContent>
                    <div className={styles.cardContainer}>
                        <div>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {route.city}
                                <br />
                            </Typography>
                            <Typography variant="h5" component="div">
                                {route.title}
                                <br />
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Start: {route.start}
                                <br />
                                Finish: {route.finish}
                            </Typography>
                            <Typography variant="body2">
                                Rating: {route.rating}
                                <br />
                                <Rating name="half-rating" className="rating" defaultValue={route.rating} precision={0.1} readOnly />
                                <br />
                                Distance: {route.longway}
                            </Typography>
                        </div>
                        <div className={styles.favourite}>
                            {user ? (
                                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} style={{ color: 'red' }} />
                                ):(
                                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} style={{ color: 'red' }} disabled />
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardActions>
                    <Link style={{color:'rgb(0, 33, 82)'}} to={`/routes/${route.id}`}>Learn More</Link>
                </CardActions>
            </Card>
        </div>
    );
};

export default RouteCard;
