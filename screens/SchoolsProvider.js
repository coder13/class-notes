import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    currentSchool: '',
    schools: []
};

const SchoolsContext = createContext();

function schoolReducer(state, action) {
    console.log(action);
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
                                                content: ''
                                            }
                                        ]
                                    } : classes
                                ))
                            } : term
                        ))
                    } : school
                ))
            }
        case 'setInitialState': 
            return {
                ...state,
                schools: action.schools,
                currentSchool: action.schools.length ? action.schools[0].name : ''
            }
        case 'updateLecture':
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
                                        lectures: classes.lectures.map(lecture => (
                                            (lecture.id == action.lecture.id) ? action.lecture : lecture)
                                        )
                                    } : classes
                                ))
                            } : term
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

    const loadData = async () => {
        try {
            const schools = await AsyncStorage.getItem('@class-notes:schools');
            dispatch({
                type: 'setInitialState',
                schools: schools === null ? [] : JSON.parse(schools),
            });
        } catch (e) {
            console.error(e);
        }
    };

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@class-notes:schools', JSON.stringify(state.schools));
        } catch (e) {
            console.error(e);
        }
    }

    // Loads the data on startup and should save on shutdown
    useEffect(() => {
        loadData();

        return () => {
            storeData();
        };
    }, []);

    // saves data whenever state changes
    useEffect(() => {
        storeData();
    }, [state]);

    return (
        <SchoolsContext.Provider value={{ state, dispatch, }} >
            {children}
        </SchoolsContext.Provider>
    )
}

export { SchoolsProvider, SchoolsContext };
