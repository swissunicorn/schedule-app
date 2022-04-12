import React, { useState, useEffect } from 'react';
// useEffect(function) called inside a component to run code in a controlled way
// and not constantly re-call it
import './App.css';
import CourseList from './components/CourseList';
import { useData } from './utilities/firebase.js';
import { timeParts } from './components/Course';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "id" : "F101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "id" : "F110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "id" : "S313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangle Interaction Design and Learning"
    },
    "S314" : {
      "id" : "S314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const App = () => { // be careful of infinite loops here
  const [schedule, loading, error] = useData('/', addScheduleTimes);

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );

  // useEffect(() => {
  //   const fetchSchedule = async () => {
  //     const response = await fetch(url);
  //     if (!response.ok) throw response;
  //     const json = await response.json();
  //     setSchedule(addScheduleTimes(json));
  //   }
  //   fetchSchedule();
  // }, []) // second argument: variables that determine when this updates
  // if these state variables change, this is run
  // if there is no argument, it runs on all updates
  // if there is an empty list argument, it runs when component first added

  // if (!schedule) return <h1>Loading schedule...</h1>;
  // return (
  // <div className="container">
  //   <Banner title={ schedule.title } />
  //   <CourseList courses={ schedule.courses } />
  // </div>);
};

export default App;