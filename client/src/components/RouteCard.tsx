import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../styles/Main.module.css';
interface Route {
    id: number;
    title: string;
    city: string;
    start: string;
    finish: string;
    longway: number;
    rating: number;
}

const RouteCard: React.FC<{ route: Route }> = ({ route }) => {
    return (
        <div className={styles.routeCard}>
            <Card sx={{ minWidth: 300, borderRadius: 10, margin: 2, padding: 3, maxWidth: 300 }}>
                <CardContent>
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
                        Distance: {route.longway}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href='#'>Learn More</a>
                </CardActions>
            </Card>
        </div>
    );
};

export default RouteCard;
