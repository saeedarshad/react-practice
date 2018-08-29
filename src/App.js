import React, { Component } from 'react';
import classes from './App.css';
import Person from './components/Person/Person'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      { id: '154', name: "saeed", age: 22 },
      { id: '155', name: "Meher", age: 23 },
      { id: '156', name: "SAEED", age: 24 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 25 },
        { name: "Meher", age: 25 },
        { name: "SAEED", age: 25 }
      ]
    });
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  render() {
    let Persons = null;
    let btnClass = null;
    if (this.state.showPersons) {
      Persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <ErrorBoundary key={person.id}>
                <Person
                  click={() => this.deletePersonHandler(index)}
                  changed={(event) => this.nameChangedHandler(event, person.id)}
                  name={person.name}
                  age={person.age}
                /></ErrorBoundary>
            })
          }
        </div>
      );
      btnClass = classes.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses = [classes.red, classes.bold].join(' ');
    }

    return (
      <div className={classes.App}>
        <h1>Welcome to React App</h1>
        <h2 className={assignedClasses}>Persons in array {this.state.persons.length}</h2>
        <p className={assignedClasses}>
          This is react app from practice.
        </p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {Persons}
      </div>
    );
  }
}

export default App;
