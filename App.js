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
      <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '15ch' }}>
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
    <FormControl fullWidth sx={{ m: 1, width:'15ch' }} variant="standard">
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

function IncomeTotal() {
  const [value, setValue] = useState('0')

  return (
  <>
    <div class="total-income">
      <table>
      <th> Total income </th>
        <tbody class="total-income-content">
          total income
        </tbody>
      </table>
    </div>
  </>)
}

function ExpensesTotal() {
  const [value, setValue] = useState('0')

  return (
  <>
    <div class="total-expenses">
      <table>
      <th> Total expenses </th>
        <tbody class="total-expenses-content">
          total expensies
        </tbody>
      </table>
    </div>
  </>)
}

function Categories() {
  const [value, setValue] = useState('0')

  return (
  <>
    <div class="Categories">
      Categories
    </div>
  </>)
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

  const [income, setIncome] = useState([{Date: null, Amount: null, Type: null}])

  const setIncomeCell = (index, type, value) => {
    const newIncome = [...income]
    newIncome[index][type] = {...income[index][type]}
    newIncome[index][type] = value
    if (index === income.length - 1){
      setIncome([...newIncome, {Date: null, Amount: null, Type: null}])
    }
    else {
      setIncome(newIncome)
    }
  }

  const incomeTableRows = income.map((row, index) => (
    <tr class="income-row">
        <td class="income-cell"><Cell type='Date' onCellChange={(value) => setIncomeCell(index, 'Date', value)}/></td>
        <td class="income-money-cell"><MoneyCell type='Amount' onCellChange={(value) => setIncomeCell(index, 'Amount', value)}/></td>
        <td class="income-cell"><Cell type='Type' onCellChange={(value) => setIncomeCell(index, 'Type', value)}/></td>
      </tr>
    ))

  const expensesTableRows = budget.map((row, index) => (
    <tr class="expenses-row">
        <td class="expenses-cell"><Cell type='Date' onCellChange={(value) => setBudgetCell(index, 'Date', value)}/></td>
        <td class="expenses-money-cell"><MoneyCell type='Amount' onCellChange={(value) => setBudgetCell(index, 'Amount', value)}/></td>
        <td class="expenses-cell"><Cell type='Type' onCellChange={(value) => setBudgetCell(index, 'Type', value)}/></td>
      </tr>
    ))

  return (
    <>
      <div class="income-table">
        <table class="income-table-t">
        <th colspan="3"> Income </th>
        <tr class="expenses-table-headers">
          <th class="expenses-headers-cell">Date</th>
          <th class="expenses-headers-cell">Amount</th>
          <th class="expenses-headers-cell">Type</th>
        </tr>
        <tbody class="income-content">
          {incomeTableRows}
        </tbody>
        </table>
      </div>
      <IncomeTotal />
      <Categories />
      <ExpensesTotal />
      <div class="expenses-table">
      <table class="expenses-table-t" aria-label="Budget">
        <th colspan="3"> Expenses </th>
        <tr class="expenses-table-headers">
          <th class="expenses-headers-cell">Date</th>
          <th class="expenses-headers-cell">Amount</th>
          <th class="expenses-headers-cell">Type</th>
        </tr>
        <tbody class="expenses-content">
          {expensesTableRows}
        </tbody>
      </table>
      {budget[0].Type}
    </div>
  </>
  )

}

export default App;
