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
                currentSchool: action.payload,
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

        case 'addTerm':
            return {
                ...state,
                schools: state.schools.map((school) => (
                    action.school === school.name ? {
                        ...school,
                        terms: [
                            ...school.terms,
                            {
                                termName: action.termName,
                                classes: [],
                            }
                        ]
                    } : school
                ))
            }


        case 'addClass':
            return {
                ...state,
                schools: state.schools.map((school) => (
                    action.school === school.name ? {
                        ...school,
                        terms: school.terms.map((term) => (
                            action.termName === term.termName ? {
                                ...term,
                                classes: [
                                    ...term.classes,
                                    {
                                        code: action.className,
                                        lectures: [],
                                    }
                                ]
                            } : term
                        ))
                    } : school
                ))
            }

        case 'addLecture':
            return {
                ...state,
                schools: state.schools.map((school) => (
                    action.school === school.name ? {
                        ...school,
                        terms: school.terms.map((term) => (
                            action.termName === term.termName ? {
                                ...term,
                                classes: term.classes.map((classes) => (
                                    action.className === classes.code ? {
                                        ...classes,
                                        lectures: [
                                            ...classes.lectures,
                                            {
                                                id: 1,
                                                title: action.lectureTitle,
                                                content: 'content'
                                            }
                                        ]
                                    } : classes
                                ))
                            } : 'gas'
                        ))
                    } : school
                ))
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
