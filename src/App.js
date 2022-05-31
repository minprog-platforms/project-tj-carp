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
      <FormControl fullWidth sx={{ m: 1, width: '15ch' }} variant="standard">
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
      <Input
        value={props.value}
        onChange={event => props.onCellChange(event.target.value)}
        startAdornment={<InputAdornment position="start">€</InputAdornment>}
      />
    </FormControl>
  </div>
  )
}

function IncomeTotal(props) {
  return (
  <>
    <div class="total-income">
      <table>
        <th colspan="3"> Total income </th>
          <tr>
            <tbody class="total-income-content">
              {props.valueTotal(props.income)}
            </tbody>
          </tr>
      </table>
    </div>
  </>)
}

function ExpensesTotal(props) {
  return (
  <>
    <div class="total-expenses">
      <table>
        <th colspan="5"> Total expenses </th>
          <tr>
            <td class="total-expenses-content">
              {props.valueTotal(props.expenses)}
            </td>
          </tr>
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

function ClearButton(props) {
  return (
    <button onClick = {() => props.handleClick()}>
      Clear
    </button>
  )
}

function ExpensesTable(props) {
  const expensesTableRows = props.expenses.map((row, index) => (
    <tr class="expenses-row">
        <td class="expenses-cell"><Cell value={row.Date} type='Date' onCellChange={(value) => props.setExpenseCell(index, 'Date', value)}/></td>
        <td class="expenses-money-cell"><MoneyCell value={row.Amount} type='Amount' onCellChange={(value) => props.setExpenseCell(index, 'Amount', value)}/></td>
        <td class="expenses-cell"><Cell value={row.Type} type='Type' onCellChange={(value) => props.setExpenseCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
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
  )
}

function IncomeTable(props) {
  const incomeTableRows = props.income.map((row, index) => (
    <tr class="income-row">
        <td class="income-cell"><Cell value={row.Date} type='Date' onCellChange={(value) => props.setIncomeCell(index, 'Date', value)}/></td>
        <td class="income-money-cell"><MoneyCell value={row.Amount} type='Amount' onCellChange={(value) => props.setIncomeCell(index, 'Amount', value)}/></td>
        <td class="income-cell"><Cell value={row.Type} type='Type' onCellChange={(value) => props.setIncomeCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
    <div>
      <table class="income-table-t">
        <th colspan="3"> Income </th>
          <tr class="income-table-headers">
            <th class="income-headers-cell">Date</th>
            <th class="income-headers-cell">Amount</th>
            <th class="income-headers-cell">Type</th>
          </tr>
          <tbody class="income-content">
            {incomeTableRows}
          </tbody>
      </table>
    </div>
  )
}

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

  const categoriesTotal = (value) => value.map(row => {
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

  const screenHeight = window.screen.height

  const setExpenseCell = createSetCell(expenses, setExpenses)

  const setIncomeCell = createSetCell(income, setIncome)

  const clearClick = () => {localStorage.clear(); window.location.reload()}

  return (
    <>
      <div class="screen">
        <div class="left-grid-container">
          <IncomeTable income={income} setIncomeCell={setIncomeCell}/>
          <IncomeTotal income={income} valueTotal={valueTotal}/>
          <div class="categories">
            <table>
              <th>Categories</th>
                <tr>necessary</tr>
                <tr>monthly</tr>
                <tr>fun</tr>
            </table>
          </div>
          <ExpensesTotal expenses={expenses} valueTotal={valueTotal} />
          <ClearButton handleClick = {clearClick}/>
        </div>
        <div class="right-grid-container">
          <ExpensesTable expenses={expenses.slice(0, 4)} setExpenseCell={setExpenseCell}/>
          <ExpensesTable expenses={expenses.slice(4, 8)} setExpenseCell={(index, type, value) => setExpenseCell(index + 4, type, value)}/>
      </div>
    </div>
  </>
  )

}

export default App;
