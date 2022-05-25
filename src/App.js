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
    <div class="categories">
      Categories
    </div>
  </>)
}

const handleChange = (prop) => (event) => {
  const [values, setValues] = useState('0')
  setValues({ ...values, [prop]: event.target.value });
};

function Budget() {
  const createSetCell = (value, setValue) => {
    return (index, type, amount) => {
      const newValue = [...value]
      newValue[index][type] = {...value[index][type]}
      newValue[index][type] = amount
      if (index === value.length - 1){
        setValue([...newValue, {Date: null, Amount: null, Type: null}])
      }
      else {
        setValue(newValue)
      }
    }
  }

  const [expenses, setExpenses] = useState([{Date: null, Amount: null, Type: null}])

  const setExpenseCell = createSetCell(expenses, setExpenses)

  const [income, setIncome] = useState([{Date: null, Amount: null, Type: null}])

  const setIncomeCell = createSetCell(income, setIncome)

  const incomeTableRows = income.map((row, index) => (
    <tr class="income-row">
        <td class="income-cell"><Cell type='Date' onCellChange={(value) => setIncomeCell(index, 'Date', value)}/></td>
        <td class="income-money-cell"><MoneyCell type='Amount' onCellChange={(value) => setIncomeCell(index, 'Amount', value)}/></td>
        <td class="income-cell"><Cell type='Type' onCellChange={(value) => setIncomeCell(index, 'Type', value)}/></td>
      </tr>
    ))

  const expensesTableRows = expenses.map((row, index) => (
    <tr class="expenses-row">
        <td class="expenses-cell"><Cell type='Date' onCellChange={(value) => setExpenseCell(index, 'Date', value)}/></td>
        <td class="expenses-money-cell"><MoneyCell type='Amount' onCellChange={(value) => setExpenseCell(index, 'Amount', value)}/></td>
        <td class="expenses-cell"><Cell type='Type' onCellChange={(value) => setExpenseCell(index, 'Type', value)}/></td>
      </tr>
    ))

  return (
    <>
      <div class="grid-container">
        <div>
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
          <IncomeTotal />
          <Categories />
          <ExpensesTotal />
        </div>
        <div>
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
        </div>
      </div>
    </div>
  </>
  )

}

export default App;
