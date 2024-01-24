'use client'
import { useEffect, useState } from 'react'

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import MediaControlCard from './card'
import { Box, Button, Card, CardActions, CardContent, IconButton } from '@mui/material';
import { Upload } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function PlatList({ handleDrawerOpen, data, handleImageActive, handleDeleteData, handleInputData }) {
  const [spacing, setSpacing] = React.useState(2);
  const [checked, setChecked] = React.useState([]);

  const [images, setImages] = useState([]);
  const handleMultipleImages = (event) => {
    let maxId = 0
    if (data.length != 0) {
      maxId = Math.max(...data.map(item => item.id));
    }

    const selectedFIles = [];
    const targetFiles = event.target.files;
    // console.log(event.target.files)
    const targetFilesObject = [...targetFiles]
    targetFilesObject.map((file, index) => {
      return selectedFIles.push({
        'id': maxId + 1 + index,
        'name': maxId+file.name,
        'image': URL.createObjectURL(file),
        'files': event.target.files[index],
        'stats': false,
        'modal': false
      })
    })
    setImages(selectedFIles);
  }

  useEffect(() => {
    handleInputData(images)
  }, [images])

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        {data.length === 0 ?
          <Grid key={99999} item sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{
              borderRadius: '12px',
              marginTop: '10vh',
              justifyContent: 'center',
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                borderStyle: 'dashed',
                width: '25vw',
                height: '40vh',
                margin: '5vh 2.5vw',
                justifyContent: 'center'
              }}
                border={2.5}
                borderRadius={'12px'}
              >
                <CardContent>
                  <IconButton aria-label='upload'>
                    <Upload />
                  </IconButton>
                </CardContent>
                <CardActions>
                  <Button component="label" variant='outlined' endIcon={<Upload />}>
                    Upload
                    {/* <VisuallyHiddenInput type="file"  /> */}
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      encType="multipart/form-data"
                      onChange={(event) => { handleMultipleImages(event) }}
                    />
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
          :
          <Grid container spacing={spacing}>
            {data.map((value) => (
              <Grid key={value.id} item>
                <MediaControlCard gambar={value.image} stats={value.stats} alt={value.name} id={value.id} handleDrawerOpen={handleDrawerOpen} handleImageActive={handleImageActive} handleDeleteData={handleDeleteData} />
              </Grid>
            ))}
            <Grid key={99999} item>
              <Card sx={{ display: 'flex', width: 242, height: 266.66 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                borderStyle: 'dashed',
                width: '40vw',
                height: 'auto',
                margin: '2vh 1vw',
                justifyContent: 'center'
              }}
                border={2.5}
                borderRadius={'12px'}
              >
                <CardContent>
                  <IconButton aria-label='upload'>
                    <Upload />
                  </IconButton>
                </CardContent>
                <CardActions>
                  <Button component="label" variant='outlined' endIcon={<Upload />}>
                    Upload
                    {/* <VisuallyHiddenInput type="file"  /> */}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      multiple
                      encType="multipart/form-data"
                      onChange={(event) => { handleMultipleImages(event) }}
                    />
                  </Button>
                </CardActions>
              </Box>
              </Card>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid>
  );
}