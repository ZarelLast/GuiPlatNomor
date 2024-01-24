'use client'

import React from 'react';
import { useEffect, useState } from 'react'
// import { metadata } from './layout';
import { Box, Button, Card, Grid, TextField, MenuItem } from '@mui/material';
// import {LoadingButton} from '@mui/lab';

// export const metadata = {
//   title: 'Dashboard',
//   description: 'Manage your account settings'
// }

const Dashboard = () => {

  const [parameterYolo, setParameterYolo] = useState([
    {
      'id': 0,
      'name': 'batch',
      'value': 1
    },
    {
      'id': 1,
      'name': 'epoch',
      'value': 2
    },
    {
      'id': 2,
      'name': 'evolve',
      'value': 3
    },
    {
      'id': 3,
      'name': 'imgsz',
      'value': 640
    },
    {
      'id': 4,
      'name': 'optimizer',
      'value': 'SGD'
    },
    {
      'id': 5,
      'name': 'path_yml',
      'value': 'dc'
    },
  ])

  const optimizerList = [
    {
      value: 'SGD',
      label: 'SGD',
    },
    {
      value: 'Adam',
      label: 'Adam',
    },
    {
      value: 'AdamW',
      label: 'AdamW',
    },
  ];

  const buttonList = [
    {
      'id': 0,
      'name': 'Upload Dataset',
      'value': 1
    },
    {
      'id': 1,
      'name': 'Cek Dataset',
      'value': 2
    },
    {
      'id': 2,
      'name': 'Training',
      'value': 3
    },
  ]
  return (
    <Box component="main" sx={{ margin: '6.8vh 0 0 0' }}>
      <Grid container sx={{ backgroundColor: '#f0f0f0' }}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1vh', justifyContent: 'center', alignItems: 'center' }}>
            <Card sx={{ width: '90%', marginTop: '4vh' }}>
              <Grid container spacing={1} margin={1}>
                {parameterYolo.map((item, key) => (
                  <Grid item key={key} xs={12} md={4}>
                    {item.name == 'optimizer' ?
                      <TextField
                        id={item.name + '' + item.id}
                        select
                        label={item.name}
                        defaultValue={item.value}
                        sx={{ marginRight: '24px' }}
                      >
                        {optimizerList.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      :
                      <TextField
                        label={item.name}
                        id={item.name + '' + item.id}
                        defaultValue={item.value}
                        size="small"
                        sx={{ marginRight: '24px' }}
                      />
                    }
                  </Grid>
                ))}
              </Grid>
            </Card>
            <Card sx={{ width: '90%', margin: '1vh' }}>
              <Grid container spacing={2}>
                {buttonList.map((item, key) => (
                  <Grid item xs={12} key={key} md={4}>
                    {/* <LoadingButton loading loadingPosition="start">
                    {item.name}
                    </LoadingButton> */}
                    <Button variant='contained'>{item.name}</Button>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={9}>
          {/* <iframe src="https://www.comet.com/zarellast/yolov5" style={{ 'width': '100%', 'height': '93.2vh', 'position': 'relative' }} allowfullscreen="true"></iframe> */}
          <iframe src="http://localhost:6006/?darkMode=true" style={{ 'width': '100%', 'height': '93.2vh', 'position': 'relative' }} allowfullscreen="true"></iframe>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Dashboard;
