'use client'
import { useEffect, useState } from 'react'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Edit, Cancel, Save } from '@mui/icons-material';
import { Button, Modal, Typography, Grid, TextField, Box, ImageListItemBar, ImageList, ImageListItem, Card } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopy from '@mui/icons-material/ContentCopy';


const DrawerWrap = ({ ImageActive, ModalData, handleDrawerClose, theme, open, drawerWidth, DrawerHeader, handleEditFileName }) => {
  const [isNameEditing, setIsNameEditing] = useState(false)
  const [tempData, setTempData] = useState(ImageActive)
  const [tempName, setTempName] = useState(tempData.name)
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  useEffect(() => {
    setTempData(ImageActive)
    setTempName(ImageActive.name)
  }, [ImageActive])

  const handleCancleClick = () => {
    setTempData(ImageActive)
    setTempName(ImageActive.name)
    setIsNameEditing(false)
  }

  const handleOnSaveClick = () => {
    setTempData(tempData => ({
      ...tempData, name: tempName
    }))
    handleEditFileName(tempData.id, tempName)
    setIsNameEditing(false)
  }

  if (ImageActive.length !== 0) {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* {[ImageActive].map((res, index) => ( */}
        <List key={tempData.id + 'wrapper_list'}>
          <ListItem key={'wrapper' + 1 + tempData.image} disablePadding>
            <ListItemButton>
              <img
                // srcSet={`${tempData.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                srcSet={tempData.image}
                // src={`${tempData.image}?w=164&h=164&fit=crop&auto=format`}
                src={tempData.image}
                alt={tempData.name}
                loading="lazy"
                width={'100%'}
              />
            </ListItemButton>
          </ListItem>

          <ListItem key={'wrapper' + 2 + tempData.id} disablePadding>
            <ListItemButton>
              <ListItemText primary={tempData.id} secondary={'Id:'} />
            </ListItemButton>
          </ListItem>

          <ListItem key={'wrapper' + 3 + tempData.name} disablePadding
            secondaryAction={
              <>
                {
                  isNameEditing
                    ?
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <IconButton edge="end" color='error' aria-label="cancel" onClick={() => handleCancleClick()}>
                        <Cancel />
                      </IconButton >
                      <IconButton edge="end" color='success' aria-label="save" onClick={() => handleOnSaveClick()}>
                        <Save />
                      </IconButton >
                    </div>
                    :
                    <IconButton edge="end" aria-label="edit" onClick={() => setIsNameEditing(true)}>
                      {/* <Edit onClick={() => handleEditFileName(tempData.id, 'coba')} /> */}
                      <Edit />
                    </IconButton >
                }
              </>
            }>
            <ListItemButton>
              {isNameEditing ? (
                <TextField
                  value={tempName}
                  onChange={(event) => {
                    setTempName(event.target.value);
                  }}
                  label="File Name:" // Use secondary text as label
                  margin="dense" // Adjust margin as needed
                />
              ) : (
                <ListItemText primary={tempName} secondary={'File Name:'} />
              )}
            </ListItemButton>
          </ListItem>
        </List>
        {/* ))
        } */}
        <Divider />
        {
          ModalData.length !== 0 ?
            <>
              <div style={{ margin: '20px' }}>
                <InputLabel htmlFor="teks_plat_modal">Plat Nomor</InputLabel>
                <OutlinedInput
                  id="teks_plat_modal_1"
                  value={ModalData.result}
                  inputProps={{
                    readOnly: true,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => { navigator.clipboard.writeText(ModalData.result) }}
                      >
                        <ContentCopy />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </div>
              <Divider />
              <div style={{ display: "flex", justifyContent: 'center', margin: '20px' }}>
                <Button onClick={handleOpen} variant='contained'>Lihat Proses</Button>
              </div>
              <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <Grid container sx={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Card sx={{margin:"10vh 0vw"}}>
                      <ImageList
                        sx={{ width: '60vw', height: '55vh' }}
                        variant="quilted"
                        cols={3}
                      // rowHeight={120}
                      >
                        {ModalData.step.map((val, idx) => (
                          <ImageListItem key={idx + val} cols={1} rows={idx == 0 ? 4 : 1}>
                            <img
                              src={'http://localhost:5000/get_image/' + ModalData.folder + '/' + val}
                              alt={val}
                              loading="lazy"
                            />
                            <ImageListItemBar position="top" title={(idx + 1) + '. ' + val.trim().substring(0, val.trim().indexOf('_'))} />
                          </ImageListItem>
                        ))}
                        <ImageListItem key={'output'} cols={2} rows={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <InputLabel htmlFor="teks_plat_modal">Plat Nomor</InputLabel>
                          <OutlinedInput
                            id="teks_plat_modal"
                            value={ModalData.result}
                            inputProps={{
                              readOnly: true,
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  onClick={() => { navigator.clipboard.writeText(ModalData.result) }}
                                >
                                  <ContentCopy />
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </ImageListItem>
                      </ImageList>
                    </Card>
                  </Grid>
                </Box>
              </Modal>
            </>
            :
            <></>
        }
      </Drawer >
    )
  }
  else {
    return <></>
  }

}

export default DrawerWrap