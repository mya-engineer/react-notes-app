import React, { useReducer } from 'react'
import axios from 'axios'
import { FirebaseContext } from './firebaseContext'
import { firebaseReducer } from './firebaseReducer'
import { ADD_NOTE, FETCH_DATA, REMOVE_NOTE, SHOW_LOADER } from '../types'

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    history: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const fetchData = () => {
    showLoader()
    setTimeout(async () => {
      const res = await axios.get(`${url}/.json`)

      const payload = Object.keys(res.data).map(key => {
        return { value: { ...res.data[key] }, key: key }
      })

      dispatch({ type: FETCH_DATA, payload })
    }, 1000)
  }

  const addNote = async title => {
    const note = {
      title,
      date: new Date().toJSON(),
    }

    try {
      const res = await axios.post(`${url}/notes.json`, note)

      const payload = {
        ...note,
        id: res.data.name,
      }

      dispatch({ type: ADD_NOTE, payload })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeNote = async note => {
    const newDate = new Date().toJSON()

    await axios.delete(`${url}/notes/${note.id}.json`)
    const res = await axios.post(`${url}/history.json`, {
      date: newDate,
      title: note.title,
    })

    dispatch({
      type: REMOVE_NOTE,
      payload: { ...note, historyId: res.data.name, date: newDate },
    })
  }

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addNote,
        removeNote,
        fetchData,
        loading: state.loading,
        notes: state.notes,
        history: state.history,
      }}>
      {children}
    </FirebaseContext.Provider>
  )
}
