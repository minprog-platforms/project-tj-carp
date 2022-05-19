import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function App() {
  return (<Budget/>)
}

const rows = [
  1,2
];

function Cell(props) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            id="standard-adornment-weight"
            onChange={handleChange('weight')}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
      </div>
    </Box>
    )
}

function MoneyCell(props) {
  return (<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
  <div>
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
      <Input
        id="standard-adornment-amount"
        onChange={handleChange('amount')}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
      />
    </FormControl>
  </div>
</Box>)
}

function Total() {
  const [value, setValue] = useState('0')

  return (<input type="text"></input>)
}

function InputAdornments() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
}

const handleChange = (prop) => (event) => {
  const [values, setValues] = useState('0')
  setValues({ ...values, [prop]: event.target.value });
};

function Budget() {

  return (
    <>
      <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><Cell /></TableCell>
              <TableCell align="right"><MoneyCell /></TableCell>
              <TableCell align="right"><Cell /></TableCell>>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )

}

export default App;
