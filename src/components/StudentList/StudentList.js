import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../../actions/students';
import Student from '../Student/Student';
import './style.css';

const StudentList = ({ students, getStudents }) => {
   const [ nameSearch, setNameSearch ] = useState('');
   const [ tagSearch, setTagSearch ] = useState('');

   useEffect(() => {
      getStudents();
   }, [getStudents]);
   return (
      <div className="students">
         <div className="input-box">
            <input 
               className="input input--large" 
               type="text" 
               placeholder="Search by name"
               value={nameSearch}
               onChange={e => setNameSearch(e.target.value)}
            />
            <input 
               className="input input--large" 
               type="text" 
               placeholder="Search by tag"
               value={tagSearch}
               onChange={e => setTagSearch(e.target.value)}
            />
         </div>
         {students // first filter is for searching by name
         .filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`;
            
            if(!nameSearch || fullName.toLowerCase().includes(nameSearch.toLowerCase())){
               return student;
            }
            return false;
          }) // second filter is for seaching by tag
         .filter(student => {
            const tagMatch = student.tags.some(tag =>
               tag.toLowerCase().includes(tagSearch.toLowerCase())
            );
            if(!tagSearch || tagMatch) {
               return student;
            }
            return false;
         })
         .map(student => 
            <Student 
               key={student.id} 
               student={student} 
            />
         )}
      </div>
   );
}
const mapStateToProps = state => ({ students: state.students });
export default connect(mapStateToProps, { getStudents })(StudentList);
