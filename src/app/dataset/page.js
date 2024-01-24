'use client'
import { useEffect, useState } from 'react'

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import PlatList from '../platlist';
import DrawerWrap from '../drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
  }),
);


export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState([{
    'id': 0,
    'name': 'K1_A3526HC.jpg',
    'image': '/K1_A3526HC.jpg'
  }, {
    'id': 1,
    'name': 'K1_AA2116HT.jpg',
    'image': '/K1_AA2116HT.jpg'
  }, {
    'id': 2,
    'name': 'K1_AA2137ET.jpg',
    'image': '/K1_AA2137ET.jpg'
  }, {
    'id': 3,
    'name': 'K1_AA2259RJ.jpg',
    'image': '/K1_AA2259RJ.jpg'
  }, {
    'id': 4,
    'name': 'K1_AA2437WP.jpg',
    'image': '/K1_AA2437WP.jpg'
  }, {
    'id': 5,
    'name': 'K1_AA2452JT.jpg',
    'image': '/K1_AA2452JT.jpg'
  }, {
    'id': 6,
    'name': 'K1_AA2930VV.jpg',
    'image': '/K1_AA2930VV.jpg'
  }])

  const [backupData, setBackupData] = useState([])
  const [ImageActiveID, setImageActiveID] = useState(null)
  const [ImageActive, setImages] = useState([]);

  useEffect(()=> {
    setBackupData(data)
  }, [data])

  const handleImageActive = (res) => {
    setImageActiveID(res)
  }

  useEffect(() => {
    setImages(data.find((item) => item.id === ImageActiveID))
  }, [ImageActiveID])

  useEffect(() => {
    setImages(data.find((item) => item.id === ImageActiveID))
  }, [data])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleDrawerOpen()
  }, [ImageActive])

  const handleEditFileName = (targetId, newName) => {
    const index = backupData.findIndex(item => item.id === targetId);
    const newData = [...data];
    newData[index] = { ...newData[index], name: newName };
    setData(newData);
  }

  // const handleInputData = () => {
  //   res = [{
  //     'id': 0,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 1,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 2,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 3,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 4,
  //     'name': 'abcdds',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 5,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }, {
  //     'id': 6,
  //     'name': 'abcd',
  //     'image': '/target.jpg'
  //   }]
  //   setData(res)
  // }

  if (data !== undefined) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Main open={open}>
          <DrawerHeader />
          <PlatList data={data} handleImageActive={handleImageActive} />
        </Main>
        {ImageActive !== undefined
          ? <DrawerWrap ImageActive={ImageActive} handleEditFileName={handleEditFileName} handleDrawerClose={handleDrawerClose} theme={theme} open={open} drawerWidth={drawerWidth} DrawerHeader={DrawerHeader} />
          : <></>}
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <Main open={open}>
          <IconButton onClick={handleInputData}>
            <ChevronLeftIcon />
          </IconButton>
        </Main>
      </Box>
    )
  }
}
