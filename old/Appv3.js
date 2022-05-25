import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function App() {
  return (<Budget/>)
}

function Cell(props) {
  
  
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
          <Input
            id="standard-adornment-weight"
            onChange={event => props.onCellChange(event.target.value)}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
        </FormControl>
      </div>
    )
}

function MoneyCell(props) {
  return (
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
  )
}

function Total() {
  const [value, setValue] = useState('0')

  return (<input type="text"></input>)
}

const handleChange = (prop) => (event) => {
  const [values, setValues] = useState('0')
  setValues({ ...values, [prop]: event.target.value });
};

function Budget() {
  const [budget, setBudget] = useState([{Date: null, Amount: null, Type: null}])

  const setBudgetCell = (index, type, value) => {
    const newBudget = [...budget]
    newBudget[index][type] = {...budget[index][type]}
    newBudget[index][type] = value
    if (index === budget.length - 1){
      setBudget([...newBudget, {Date: null, Amount: null, Type: null}])
    }
    else {
      setBudget(newBudget)
    }
  }

  const tableRows = budget.map((row, index) => (
    <tr class="expenses-row">
        <td class="expenses-cell"><Cell type='Date' onCellChange={(value) => setBudgetCell(index, 'Date', value)}/></td>
        <td class="expenses-money-cell"><MoneyCell type='Amount' onCellChange={(value) => setBudgetCell(index, 'Amount', value)}/></td>
        <td class="expenses-cell"><Cell type='Type' onCellChange={(value) => setBudgetCell(index, 'Type', value)}/></td>
      </tr>
    ))

  return (
    <>
      <div class="expenses-table">
      <table class="expenses-table-t" aria-label="Budget">
        <thead> Expenses </thead>
        <tr class="expenses-table-headers">
          <th class="expenses-headers-cell" role="columnheader" scope="col">Date</th>
          <th class="expenses-headers-cell" role="columnheader" scope="col">Amount</th>
          <th class="expenses-headers-cell" role="columnheader" scope="col">Type</th>
        </tr>
        <tbody class="expenses-content">
          {tableRows}
        </tbody>
      </table>
      {budget[0].Type}
    </div>
  </>
  )

}

export default App;
