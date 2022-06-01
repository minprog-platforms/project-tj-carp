import './App.css';
import { useState } from 'react';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

function App() {
  return (<Budget/>)
}

// Input fields for table cells
function Cell(props) {
  // Input field for monetary value
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

  // Regular input field
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

// Component with overview of the sum of all the monetary value cells of income
function IncomeTotal(props) {
  return (
  <>
    <div>
      <table class="total-income">
        <th> Total income </th>
          <tr>
            <td>
              €{props.valueTotal(props.income)}
            </td>
          </tr>
      </table>
    </div>
  </>)
}

// Component with overview of the sum of all the monetary value cells of expenses
function ExpensesTotal(props) {
  return (
  <>
    <div>
      <table class="total-expenses">
        <th> Total expenses </th>
          <tr>
            <td>
              €{props.valueTotal(props.expenses)}
            </td>
          </tr>
      </table>
    </div>
  </>)
}

// Component with overview of the sum of all the monetary value cells of categories
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

// Button to clear entire budget + memory
function ClearButton(props) {
  return (
    <button onClick = {() => props.handleClick()}>
      Clear
    </button>
  )
}

// Component for table + rows of expenses
function ExpensesTable(props) {
  const expensesTableRows = props.expenses.map((row, index) => (
    <tr>
        <td><Cell value={row.Date} type='Date' onCellChange={(value) => props.setExpenseCell(index, 'Date', value)}/></td>
        <td><Cell value={row.Amount} type='Amount' onCellChange={(value) => props.setExpenseCell(index, 'Amount', value)}/></td>
        <td><Cell value={row.Type} type='Type' onCellChange={(value) => props.setExpenseCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
    <div>
      <table class="expenses-table" aria-label="Budget">
        <th colspan="3"> Expenses </th>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Type</th>
        </tr>
        <tbody>
          {expensesTableRows}
        </tbody>
      </table>
    </div>
  )
}

// Component for table + rows of income
function IncomeTable(props) {
  const incomeTableRows = props.income.map((row, index) => (
    <tr>
        <td><Cell value={row.Date} type='Date' onCellChange={(value) => props.setIncomeCell(index, 'Date', value)}/></td>
        <td><Cell value={row.Amount} type='Amount' onCellChange={(value) => props.setIncomeCell(index, 'Amount', value)}/></td>
        <td><Cell value={row.Type} type='Type' onCellChange={(value) => props.setIncomeCell(index, 'Type', value)}/></td>
    </tr>
    ))

  return (
    <div>
      <table class="income-table">
        <th colspan="3"> Income </th>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
          <tbody>
            {incomeTableRows}
          </tbody>
      </table>
    </div>
  )
}

// Component giving overview of remaining budget
function Spendable(props) {
  return (
  <>
    <div>
      <table class="spendable">
        <th> Spendable </th>
          <tr>
            <td>
              €{props.valueTotal(props.income) - props.valueTotal(props.expenses)}
            </td>
          </tr>
      </table>
    </div>
  </>)
}


function Budget() {
  // Load existing income and/or expenses, or create new objects upon start-up
  const getInitialValues = (type) => {
    if (type in localStorage){
      return JSON.parse(localStorage.getItem(type))
    } 
    
    return [{Date: null, Amount: null, Type: null}]
  }

  // Objects containing all (previously) input data for expenses and income
  const [expenses, setExpenses] = useState(getInitialValues('expenses'))
  const [income, setIncome] = useState(getInitialValues('income'))

  // Function to calculate the sum amount of income or expenses
  const valueTotal = (value) => value.map(row => {
    return (row['Amount'] === null || row['Amount'] === "") ? 0 : parseFloat(row['Amount'])
  }).reduce((a, b) => a + b, 0)

  // Function to calculate the sum amount for input category
  const categoriesTotal = (type) => expenses.map(row => {
    return (
      row['Type'] == type ? row['Amount'] === null || row['Amount'] === "" ? 0 : parseFloat(row['Amount']) : 0
      )
  }).reduce((a, b) => a + b, 0)

  // Function to store the input of a Cell into the corresponding object, and save it to browser memory
  const createSetCell = (value, setValue) => {
    return (index, type, input) => {
      const newValue = [...value]
      newValue[index][type] = {...value[index][type]}
      newValue[index][type] = input
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

  // Function for button to clear budget + memory and reload the page
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
