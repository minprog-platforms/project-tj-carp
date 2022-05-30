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
            value={props.value}
            onChange={event => props.onCellChange(event.target.value)}
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
        value={props.value}
        onChange={event => props.onCellChange(event.target.value)}
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
          total expenses
        </tbody>
      </table>
    </div>
  </>)
}

function Categories() {
  const [value, setValue] = useState('0')

  return (
  <>
    
  </>)
}

/*function ClearButton(props) {
  return (
    <button onClick = {() => props.handleClick(props.action)}>
      Clear
    </button>
  )
}*/

const handleChange = (prop) => (event) => {
  const [values, setValues] = useState('0')
  setValues({ ...values, [prop]: event.target.value });
};

function Budget() {
  const getInitialValues = (type) => {
    if (type in localStorage){
      return JSON.parse(localStorage.getItem(type))
    } 
    
    return [{Date: null, Amount: null, Type: null}]
  }

  const [expenses, setExpenses] = useState(getInitialValues('expenses'))
  const [income, setIncome] = useState(getInitialValues('income'))

  const valueTotal = (value) => value.map(row => {
    return (row['Amount'] === null) ? 0 : parseFloat(row['Amount'])
  }).reduce((a, b) => a + b, 0)

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
      if (value === expenses){
        const exstring = JSON.stringify(value)
        localStorage.setItem('expenses', exstring)
      } else if (value === income){
        const instring = JSON.stringify(value)
        localStorage.setItem('income', instring)
      }
    }
  }

  const setExpenseCell = createSetCell(expenses, setExpenses)

  const setIncomeCell = createSetCell(income, setIncome)

  const incomeTableRows = income.map((row, index) => (
    <tr class="income-row">
        <td class="income-cell"><Cell value={row.Date} type='Date' onCellChange={(value) => setIncomeCell(index, 'Date', value)}/></td>
        <td class="income-money-cell"><MoneyCell value={row.Amount} type='Amount' onCellChange={(value) => setIncomeCell(index, 'Amount', value) /*SETINCOMETOTAL HERE?*/}/></td>
        <td class="income-cell"><Cell value={row.Type} type='Type' onCellChange={(value) => setIncomeCell(index, 'Type', value)}/></td>
    </tr>
    ))

  const expensesTableRows = expenses.map((row, index) => (
    <tr class="expenses-row">
        <td class="expenses-cell"><Cell value={row.Date} type='Date' onCellChange={(value) => setExpenseCell(index, 'Date', value)}/></td>
        <td class="expenses-money-cell"><MoneyCell value={row.Amount} type='Amount' onCellChange={(value) => setExpenseCell(index, 'Amount', value) /*SETEXPENSESTOTAL HERE?*/}/></td>
        <td class="expenses-cell"><Cell value={row.Type} type='Type' onCellChange={(value) => setExpenseCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
    <>
      <div class="screen">
        <div class="left-grid-container">
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
          </div>
          <div class="total-income">
            <table>
              <th colspan="3"> Total income </th>
                <tbody class="total-income-content">
                  {valueTotal(income)}
                </tbody>
            </table>
          </div>
          <div class="categories">
            Categories
          </div>
          <div>
            <table>
              <th> Total expenses </th>
                <tbody class="total-expenses-content">
                  {valueTotal(expenses)}
                </tbody>
            </table>
          </div>
        </div>
        <div class="right-grid-container">
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
