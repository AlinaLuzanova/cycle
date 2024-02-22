import * as React from "react";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import RouteInterface from "../interfaces/RouteInterface.ts";

interface SearchParams {
    city: string;
    start: string;
    finish: string;
    distance: number;
}

const SideBar: React.FC = () => {
    const [formData, setFormData] = useState<SearchParams>({
        city: '',
        start: '',
        finish: '',
        distance: 0,
    });

    const [starts, setStarts] = useState<string[]>([]);
    const [finishes, setFinishes] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCityChange = async (_: React.ChangeEvent<{}>, newValue: RouteInterface | null) => {
        const selectedCity = newValue ? newValue.city : '';
        setFormData({ ...formData, city: selectedCity });

        // Fetch starts and finishes for the selected city
        await fetchStartsAndFinishes(selectedCity);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const resJson = await response.json();
            if (resJson.text === 'OK') {
                // Успешно
            }

        } catch (error) {
            console.error(error);
        }
    };



    const [cities, setCities] = useState<RouteInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/cities");
                const jsonData: RouteInterface[] = await response.json();
                setCities(jsonData);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const fetchStartsAndFinishes = async (selectedCity: string) => {
        try {
            const response = await fetch(`http://localhost:3000/startsAndFinishes?city=${selectedCity}`);
            const jsonData = await response.json();
            if (Array.isArray(jsonData) && jsonData.length > 0) {
                const startsArray = jsonData.map(item => item.start);
                const finishesArray = jsonData.map(item => item.finish);
                setStarts(startsArray);
                setFinishes(finishesArray);
            } else {
                console.error('Invalid data format received from server');
            }
        } catch (error) {
            console.error('Error fetching starts and finishes: ', error);
        }
    };


    return (
        <div className="sidebar">
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    sx={{ backgroundColor: 'white' }}
                    disablePortal
                    id="combo-box-demo"
                    options={cities}
                    getOptionLabel={(option: RouteInterface) => option.city}
                    value={cities.length > 0 ? cities.find(city => city.city === formData.city) || null : null}
                    onChange={handleCityChange}
                    renderInput={(params) => <TextField {...params} name="city" label="City" />}
                />
                <Autocomplete
                    sx={{ backgroundColor: 'white' }}
                    disablePortal
                    id="combo-box-start"
                    options={starts}
                    value={formData.start}
                    onChange={(_, newValue) => setFormData({ ...formData, start: newValue || '' })}
                    renderInput={(params) => <TextField {...params} name="start" label="Start" />}
                />
                <Autocomplete
                    sx={{ backgroundColor: 'white' }}
                    disablePortal
                    id="combo-box-finish"
                    options={finishes}
                    value={formData.finish}
                    onChange={(_, newValue) => setFormData({ ...formData, finish: newValue || '' })}
                    renderInput={(params) => <TextField {...params} name="finish" label="Finish" />}
                />
                <input type="text" name="distance" placeholder="Distance" value={formData.distance} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SideBar;
