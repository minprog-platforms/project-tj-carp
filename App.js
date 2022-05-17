import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';


function App() {
  return (<Budget/>)
}

function Expenses() {
  const [expensesArray, setExpensesArray] = useState([0, 0, 0])

  const updateExpensesArray = (index, newExpense) => {
    const newExpensesArray = [...expensesArray]
    newExpensesArray[index] = newExpense
    setExpensesArray(newExpensesArray)
    console.log(newExpensesArray.reduce((total, val) => total + val, 0))
  }
  
  const expenseRows = expensesArray.map((expense, i) => <ExpenseRow setExpense={money => updateExpensesArray(i, money)}/>)

  return (
    <>
      {expenseRows}
    </>
  )
}

function ExpenseRow(props) {
  return (
    <>
      <Cell/>
      <MoneyCell setMoney={props.setExpense}/>
      <Cell/>
    </>
  )
}

function Cell(props) {
  
  return (<input type="text" onChange={event => {
    const cell = event.target.value
    props.setCell(cell)
  }}></input>)
}

function MoneyCell(props) {
  
  return (<input type="text" onChange={event => {
    const money = event.target.value
    props.setMoney(money)
  }}></input>)
}

function Total() {
  const [value, setValue] = useState('0')

  const handleClick = (digit) => {
    if (digit === 'C') {
      setValue('0')
    } else if (value === '0') {
      setValue(digit)
    } else {
      setValue(value + digit)
    }
  }

  return (<input type="text"></input>)
}

function Budget() {
  const [value, setValue] = useState('0')

  const handleClick = (digit) => {
    if (digit === 'C') {
      setValue('0')
    } else if (value === '0') {
      setValue(digit)
    } else {
      setValue(value + digit)
    }
  }

  return (
    <div class="mdc-data-table">
      <table class="mdc-data-table__table" aria-label="Budget">
        <thead> Expenses </thead>
        <tr class="mdc-data-table__header-row">
          <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Date</th>
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Amount</th>
          <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Type</th>
        </tr>
        <tbody class="mdc-data-table__content">
          <tr class="mdc-data-table__row">
            <td class="mdc-data-table__cell"><Expenses /></td>
          </tr>
          <tr class="mdc-data-table__row">
            <td class="mdc-data-table__cell">12/05/2022</td>
            <td class="mdc-data-table__cell">€3</td>
            <td class="mdc-data-table__cell">coffee</td>
          </tr>
          <tr class="mdc-data-table__row">
            <td class="mdc-data-table__cell">12/05/2022</td>
            <td class="mdc-data-table__cell">€4.35</td>
            <td class="mdc-data-table__cell">lunch</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


export default App;
