'use client'
import { useEffect, useState } from 'react'

import * as React from 'react';
import Grid from '@mui/material/Grid';

import MediaControlCard from './card'

export default function PlatList({handleDrawerOpen, data, handleImageActive}) {
  // console.log(data)
  // const data = [...Array(99)]
  const [spacing, setSpacing] = React.useState(2);
  const [checked, setChecked] = React.useState([]);
  //   const handleChange = (event) => {
  //     setSpacing(Number(event.target.value));
  //   };

  //   const jsx = `
  // <Grid container spacing={${spacing}}>
  // `;
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {data.map((value) => (
            <Grid key={value.id} item>
              {/* <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              /> */}
              {/* <Checkbox
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': value,
                }}
              />
               */}
              <MediaControlCard gambar={value.image} alt={value.name} id={value.id} handleImageActive={handleImageActive}/>
              {/* <Checkbox defaultChecked sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}/> */}
              {/* <CardWithCheckbox/> */}
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  row
                >
                  {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid> */}
    </Grid>
  );
}