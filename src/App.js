import './App.css';
import { useState } from 'react';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function App() {
  return (<Budget/>)
}

function Cell(props) {
  if (props.type === "Amount") {
    return (
      <div>
        <FormControl fullWidth sx={{ width:'15ch' }} variant="standard">
          <Input
            value={props.value}
            onChange={event => props.onCellChange(event.target.value)}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          />
        </FormControl>
      </div>
      )
  }
  
  return (
    <div>
      <FormControl fullWidth sx={{ width: '15ch' }} variant="standard">
          <Input
            value={props.value}
            onChange={event => props.onCellChange(event.target.value)}
          />
        </FormControl>
      </div>
    )
}

function IncomeTotal(props) {
  return (
  <>
    <div>
      <table class="total-income">
        <th> Total income </th>
          <tr>
            <td class="total-income-content">
              €{props.valueTotal(props.income)}
            </td>
          </tr>
      </table>
    </div>
  </>)
}

function ExpensesTotal(props) {
  return (
  <>
    <div>
      <table class="total-expenses">
        <th> Total expenses </th>
          <tr>
            <td class="total-expenses-content">
              €{props.valueTotal(props.expenses)}
            </td>
          </tr>
      </table>
    </div>
  </>)
}

function Categories(props) {
  return (
  <>
    <div>
      <table class="categories">
        <th colspan="2">Categories</th>
          <tr>
            <td>Necessary</td>
            <td>€{props.categoriesTotal('Necessary')}</td>
          </tr>
          <tr>
            <td>Monthly</td>
            <td>€{props.categoriesTotal('Monthly')}</td>
          </tr>
          <tr>
            <td>Fun</td>
            <td>€{props.categoriesTotal('Fun')}</td>
          </tr>
      </table>
    </div>
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
        <td class="expenses-cell"><Cell value={row.Amount} type='Amount' onCellChange={(value) => props.setExpenseCell(index, 'Amount', value)}/></td>
        <td class="expenses-cell"><Cell value={row.Type} type='Type' onCellChange={(value) => props.setExpenseCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
    <div>
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
        <td class="income-cell"><Cell value={row.Amount} type='Amount' onCellChange={(value) => props.setIncomeCell(index, 'Amount', value)}/></td>
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

function Spendable(props) {
  return (
  <>
    <div>
      <table class="spendable">
        <th> Spendable </th>
          <tr>
            <td class="spendable-content">
              €{props.valueTotal(props.income) - props.valueTotal(props.expenses)}
            </td>
          </tr>
      </table>
    </div>
  </>)
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
    return (row['Amount'] === null || row['Amount'] === "") ? 0 : parseFloat(row['Amount'])
  }).reduce((a, b) => a + b, 0)

  const categoriesTotal = (type) => expenses.map(row => {
    return (
      row['Type'] == type ? row['Amount'] === null || row['Amount'] === "" ? 0 : parseFloat(row['Amount']) : 0
      )
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

  const clearClick = () => {localStorage.clear(); window.location.reload()}

  return (
    <>
      <div class="screen">
        <div class="left-grid-container">
          <IncomeTable income={income.slice(0, 17)} setIncomeCell={setIncomeCell}/>
          <IncomeTotal income={income} valueTotal={valueTotal}/>
          <ExpensesTotal expenses={expenses} valueTotal={valueTotal} />
          <Categories categoriesTotal={categoriesTotal} />
          <Spendable income={income} expenses={expenses} valueTotal={valueTotal}/>
          <ClearButton handleClick = {clearClick}/>
        </div>
        <div class="right-grid-container">
          <ExpensesTable expenses={expenses.slice(0, 27)} setExpenseCell={setExpenseCell}/>
          <ExpensesTable expenses={expenses.slice(27, 54)} setExpenseCell={(index, type, value) => setExpenseCell(index + 27, type, value)}/>
          <ExpensesTable expenses={expenses.slice(54, 81)} setExpenseCell={(index, type, value) => setExpenseCell(index + 54, type, value)}/>
      </div>
      {/*License footer code from https://project.mprog.nl/milestones/cleanup*/}
      <footer>
        This work is licensed under a 
        <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">
          CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
        </a>
        <a rel="license" href="https://creativecommons.org/publicdomain/zero/1.0/">
          <img alt="Creative Commons License" src="88x31.png" height="60%"/>
        </a>
      </footer>
    </div>
  </>
  )
}

export default App;
