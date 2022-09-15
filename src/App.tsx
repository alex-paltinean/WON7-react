import React, { FC, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Country } from './model/Country';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, Chip, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import EditForm from './components/EditForm';
import { host } from './properties';
import EditIcon from '@mui/icons-material/Edit';

const App: FC = () => {
  // code, logic...
  const [countries, setCountries] = useState<Country[]>();
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [continents, setContinents] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const onClick = (country: Country) => {
    console.log(country.name + " was clicked");
    setSelectedCountry(country);
  }

  const reloadCountries = () => {
    axios.get(host + '/countries?text=' + searchText).then((response) => setCountries(response.data));
  }

  useEffect(() => {
    reloadCountries();
    axios.get(host + "/continents").then((response) => setContinents(response.data));
  }, []);

  useEffect(() => {
    reloadCountries();
  }, [searchText]);

  const closeEditForm = (reload: boolean): void => {
    console.log("closeEditForm");
    setSelectedCountry(undefined);
    if (reload) {
      reloadCountries();
    }
  }

  const deleteCountry = (country: Country) => {
    axios.delete(host + "/countries/" + country.id).then((response) => reloadCountries());

  }


  return (
    <Box sx={{ height: 1, display:"flex", flexDirection:"column" }}>
      <Box sx={{ width: 1, backgroundColor: "gray", display: 'flex' }}>
        <img src='https://fasttrackit.org/wp-content/uploads/2020/08/fasttrackit.png'></img>
        <Box sx={{ flexGrow: 1 }}></Box>
        <TextField sx={{ m: 1 }} label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}></TextField>
      </Box>
      {selectedCountry && <EditForm continents={continents} selectedCountry={selectedCountry} closeEditForm={closeEditForm}></EditForm>}
      <Box sx={{overflow:"auto"}}>
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
              <CardActions>
                <Button onClick={() => onClick(country)}><EditIcon /></Button>
                <Button variant="contained" sx={{ backgroundColor: "red" }} onClick={() => deleteCountry(country)}>Delete</Button>
              </CardActions>
            </CardContent>
          </Card>)}
      </Box>
    </Box>
  );
}

export default App;
