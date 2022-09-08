import React, { FC, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Country } from './model/Country';
import { Button, Card, CardContent, CardHeader, Checkbox, Chip, FormControlLabel, Grid, Typography } from '@mui/material';

const App: FC = () => {
  // code, logic...
  const [countries, setCountries] = useState<Country[]>();
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);

  const onClick = (country: Country) => {
    console.log(country.name + " was clicked");
    setSelectedCountry(country);
  }

  useEffect(() => {
    axios.get('http://localhost:8888/countries').then((response) => setCountries(response.data));
  }, []);


  return (
    <div>
      {selectedCountry && <Card sx={{ margin: 2, backgroundColor:"gray" }}>
        <CardContent>{selectedCountry?.name} will be edited here</CardContent>
        <Button onClick={()=>setSelectedCountry(undefined)}>Close</Button>
      </Card>}
      {countries?.map(country =>
        <Card sx={{ margin: 2 }}>
          <CardContent>
            <Typography>{country.name}</Typography>
            <Chip label={country?.capital.name}></Chip>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography fontSize="small" sx={{ color: 'gray' }}>Continent: {country.continent}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontSize="small">Area: {country.area}</Typography>
              </Grid>
            </Grid>
            <FormControlLabel control={<Checkbox checked={country.continent === "Europe"} disabled />} label="In Europe" />
            <Button variant="contained" onClick={() => onClick(country)}>Edit</Button>
          </CardContent>
        </Card>)}
    </div>
  );
}

export default App;
