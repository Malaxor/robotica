import axios from 'axios';
import { GET_STUDENTS, APPEND_TAG } from './types';

export const getStudents = () => async dispatch => {
   try {
      const { data } = await axios.get('https://api.hatchways.io/assessment/students');
      const students = data.students.map(student => {
         return {
            ...student,
            tags: []
         }
      })
      dispatch({ type: GET_STUDENTS, payload: students });
   }
   catch(err) {
      console.error(err);
   }
}
export const appendTag = (id, tag) => {
   return {
      type: APPEND_TAG,
      payload: { id, tag }
   };
}
