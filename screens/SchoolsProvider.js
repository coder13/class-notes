import React, { createContext, useReducer } from 'react';

const initialState = {
    currentSchool: 'CWU',
    schools: [{
        name: 'CWU',
        terms: [{
            termName: 'Spring 2021',
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

        case 'addSchool':
            return {
                ...state,
                schools: [
                    ...state.schools,
                    {
                        name: action.payload,
                        terms: [],
                    }
                ]
            }

        /* This logic throws errors when ran. Tried multiple different formats but ran into errors multiple times */
        case 'addTerm':
            return {
                ...state,
                schools: {
                    ...state.schools,
                    terms: [
                        ...state.schools.terms,
                        {
                            termName: action.payload,
                            classes: [],
                        }
                    ]
                }
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
