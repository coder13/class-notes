import React, { createContext, useReducer } from 'react';

const initialState = {
    currentSchool: 'CWU',
    schools: [{
      name: 'CWU',
      terms: [{
          name: 'Fall',
          year: 2019,
          classes: [{
              code: 'CS 446',
              lectures: [{
                  id: 0,
                  title: 'foo bar',
                  content: 'lorem ipsum'
              }]
          }]
      }],
    }, {
      name: 'WSU',
      terms: [],
    }]
};

const SchoolsContext = createContext();

function schoolReducer(state, action) {
    switch (action.type) {
        case 'setSchool':
            return {
                ...state,
                currentSchool: action.school,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function SchoolsProvider({ children }) {
    const [state, dispatch] = useReducer(schoolReducer, initialState);

    return (
        <SchoolsContext.Provider value={{ state, dispatch }} >
            {children}
        </SchoolsContext.Provider>
    )
}

export { SchoolsProvider, SchoolsContext };
