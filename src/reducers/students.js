import { GET_STUDENTS, APPEND_TAG } from '../actions/types';

const studentsReducer = (state = [], { payload, type }) => {
   switch(type) {
      case GET_STUDENTS:
         return [...payload];
      case APPEND_TAG:
         return state.map(student => {
                  if(student.id === payload.id) {
                     return {
                        ...student,
                        tags: [...student.tags, payload.tag]
                     };
                  }
                  return student;
               });
      default:
      return state;
   }
}
export default studentsReducer;
