import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import averageGrade from '../../utils/averageGrade';
import { v4 as uuid } from 'uuid';
import { appendTag } from '../../actions/students';
import './style.css';

const Student = ({ 
   appendTag,
   student: {
      id,
      firstName,
      lastName,
      pic,
      email,
      company,
      skill, 
      grades,
      tags
   }}) => {
   const fullName = `${firstName} ${lastName}`;
   const studentGradesEl = useRef();
   const [tag, setTag] = useState('');
   
   const onTagSubmit = e => {
      e.preventDefault();
      if(tag) {
         appendTag(id, tag);
         setTag('');
      }
   }
   return (
      <div className="student">
         <img src={pic} alt={fullName} className="student__img" />
         <div className="student__information">
            <h3 className="student__name">{fullName}</h3>
            <ul className="student__details">
               <li className="student__detail">Email: {email}</li>
               <li className="student__detail">Compay: {company}</li>
               <li className="student__detail">Skill: {skill}</li>
               <li className="student__detail">Average: {averageGrade(grades)}%</li>
            </ul>
            <ul ref={studentGradesEl} className="student__grades">
               {grades.map((grade, index) => 
                  <li key={uuid()} className="student__grade">Test {index + 1} &mdash; <span>{grade}%</span></li>
               )}
            </ul>
            <div className="student__tags">
               {tags.map(tag => <span key={uuid()} className="student__tag">{tag}</span>)}
            </div>
            <div className="student__form">
               <form action="#" className="form" onSubmit={onTagSubmit}>
                  <input 
                     className="input input--small" 
                     type="text" 
                     placeholder="Add a tag"
                     value={tag}
                     onChange={e => setTag(e.target.value)}
                  />
               </form>
            </div>
            <button 
               className="btn"
               onClick={() => studentGradesEl.current.classList.toggle('open')}
            >
               <div className="horizontal"></div>
               <div className="vertical"></div>
            </button>
         </div>
      </div>
   );
}
export default connect(null, { appendTag })(Student);
