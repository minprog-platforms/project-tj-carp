import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from 'react';

function App() {
  return (<Budget/>)
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
        <thead>
          <th>Expenses</th>
          <tr class="mdc-data-table__header-row">
            <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Date</th>
            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Amount</th>
            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Type</th>
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">12/05/2022</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">€10.54</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">groceries</td>
          </tr>
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">12/05/2022</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">€3</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">coffee</td>
          </tr>
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">12/05/2022</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">€4.35</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">lunch</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


export default App;
