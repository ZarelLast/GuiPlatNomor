'use client'
import { useEffect } from 'react'

import React, { useState } from "react";
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Tooltip, Button } from '@mui/material';
import { Delete, Settings } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';


export default function MediaControlCard(props) {
  // const theme = useTheme();
  // const [checked, setChecked] = useState(false);

  const handleToggle = ({ handleImageActive, handleDrawerOpen, id }) => {
    handleImageActive(id)
    handleDrawerOpen()
  }

  return (
    <Card sx={{ display: 'flex' }}>
      {props.stats ?
        (
          <Card sx={{ width: '200px', height: '275px', boxShadow: '0', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <CircularProgress />
          </Card>
        )
        :
        (
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={props.gambar}
            alt={props.alt}
          />
        )
      }
      <Grid item xs={2}>
        <Tooltip placement="left" title="Delete">
          <IconButton onClick={() => props.handleDeleteData(props.id)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <br />
        <Tooltip placement="left" title="Details">
          <IconButton onClick={() => handleToggle(props)}>
            <Settings />
          </IconButton>
        </Tooltip>
      </Grid>
    </Card>
  );
}
