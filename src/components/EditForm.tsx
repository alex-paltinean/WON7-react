import { Card, CardContent, Button, TextField, CardActions, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { createDocumentRegistry } from "typescript";
import { Country } from "../model/Country";
import { host } from "../properties";

export type EditFormPros = {
    selectedCountry: Country,
    closeEditForm: (reload: boolean) => void,
    continents: string[]
}

const EditForm: FC<EditFormPros> = ({ selectedCountry, closeEditForm, continents }) => {
    const [countryName, setCountryName] = useState<string>(selectedCountry.name);
    const [selectedContinent, setSelectedContinent] = useState<string>(selectedCountry.continent);

    useEffect(() => {
        setCountryName(selectedCountry.name);
    }, [selectedCountry]);

    useEffect(() => {
        console.log(countryName);
    }, [countryName]);

    const save = () => {
        axios.put(host + "/countries/" + selectedCountry.id, { name: countryName, continent: selectedContinent }).then(response => closeEditForm(true));
    }

    return (
        <div>
            <Card sx={{ margin: 2 }}>
                <CardContent>{selectedCountry?.name} will be edited here</CardContent>
                <TextField value={countryName} label="Name" onChange={(e) => setCountryName(e.target.value)}></TextField>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Continent</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedContinent}
                        label="Continent"
                        onChange={(e) => setSelectedContinent(e.target.value)}
                    >
                        {continents.map(continent => <MenuItem value={continent}>{continent}</MenuItem>)}
                    </Select>
                </FormControl>
                <CardActions>
                    <Button variant="contained" onClick={() => save()}>save</Button>
                    <Button onClick={() => closeEditForm(false)}>Close</Button>
                </CardActions>
            </Card>
        </div>
    );

}

export default EditForm;