'use client'
import { useEffect, useState } from 'react'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import PlatList from './platlist'
import DrawerWrap from './drawer'
import { Button } from '@mui/material';

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
    position: 'relative',
  }),
);


export default function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])
  const [backupData, setBackupData] = useState([])
  const [ImageActiveID, setImageActiveID] = useState(null)
  const [ImageActive, setImages] = useState([]);
  const [ProsesData, setProsesData] = useState(null);
  const [ModalData, setModalData] = useState([]);


  useEffect(() => {
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

  useEffect(() => {
    if (ProsesData !== null) {
      setModalData(ProsesData.find((item) => item.id === ImageActiveID))
    }
    console.log('h', ModalData)
    console.log('h', ImageActive)
  }, [ImageActiveID])

  useEffect(() => {
    if (ProsesData !== null) {
      setModalData(ProsesData.find((item) => item.id === ImageActiveID))
    }
    console.log('h', ModalData)
    console.log('h', ImageActive)
  }, [ProsesData])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDeleteData = (targetId) => {
    // const index = data.findIndex(item => item.id === targetId);
    const newData = data.filter((item) => item.id !== targetId);
    setData(newData)
  }

  useEffect(() => {
    handleDrawerOpen()
  }, [ImageActive])

  const handleEditFileName = (targetId, newName) => {
    const index = data.findIndex(item => item.id === targetId);
    const newData = [...data];
    newData[index].name = newName
    setData(newData);
  }

  const handleInputData = (addData) => {
    const newData = [...data, ...addData]
    setData(newData)
    // console.log(data)
  }

  const handleUpdateStats = (val) => {
    const newData = [...data]
    for (var x = 0; x < newData.length; x++) {
      newData[x].stats = val
    }
    setData(newData)
  }

  const handlePredict = () => {
    const formData = new FormData();
    fetch('http://127.0.0.1:5000/detecting', {
      method: 'POST',
      // body: 'exp2'
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        handleUpdateStats(res.stats)
        const newProses = [...res.proses]
        setProsesData(newProses)
        console.log(ProsesData)
      })
  }

  const handleProses = () => {
    const formData = new FormData();
    handleUpdateStats(true)
    for (var x = 0; x < data.length; x++) {
      formData.append('images', data[x].files, data[x].name)
    }

    const requestOptions = {
      method: 'POST',
      body: formData
    };

    fetch('http://127.0.0.1:5000/upload', requestOptions)
      .then(response => response.json())
      .then(res => console.log(res))
      .finally(() => {
        handlePredict()
      });
  }

  const TextFile = () => {
    let hasil = []
    ProsesData.map((val, idx)=>{
      hasil = [...hasil, ['kendaraan '+idx+': '+val.result+'\n']]
    })
    console.log(hasil)
    const element = document.createElement("a");
    const file = new Blob(hasil, { type: 'text/plain', endings: 'native' });
    element.href = URL.createObjectURL(file);
    element.download = "plat_kendaraan.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Main open={open}>
        <DrawerHeader />
        <PlatList data={data} handleImageActive={handleImageActive} handleDeleteData={handleDeleteData} handleInputData={handleInputData} handleDrawerOpen={handleDrawerOpen} />
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1vh 5vw', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'flex-end' }} elevation={3}>
          <Button sx={{margin:'0 1vw 0 0'}} variant="contained" onClick={() => handleProses()}>Proses</Button>
          {ProsesData != null
            ? <Button variant="contained" onClick={() => TextFile()}>Simpan Hasil</Button>
            : <></>
          }
        </Box>
        {/* <Button onClick={() => handleUpdateStats(true)}>Proses</Button> */}
      </Main>
      {ImageActive !== undefined
        ? <DrawerWrap ImageActive={ImageActive} ModalData={ModalData} handleEditFileName={handleEditFileName} handleDrawerClose={handleDrawerClose} theme={theme} open={open} drawerWidth={drawerWidth} DrawerHeader={DrawerHeader} />
        : <></>}
    </Box>
  );
}
