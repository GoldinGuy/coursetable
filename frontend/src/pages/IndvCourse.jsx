import React, { useCallback, useEffect, useState } from 'react';

import { Row, Col, Fade, Spinner } from 'react-bootstrap';
import { FaCompressAlt, FaExpandAlt } from 'react-icons/fa';
import WorksheetCalendar from '../components/Worksheet/WorksheetCalendar';
import WorksheetCalendarList from '../components/Worksheet/WorksheetCalendarList';
import WorksheetAccordion from '../components/Worksheet/WorksheetAccordion';
import WorksheetList from '../components/Worksheet/WorksheetList';
import CourseModal from '../components/CourseModal/CourseModal';
import CourseModalOverview from '../components/CourseModal/CourseModalOverview';
import {
  SurfaceComponent,
  StyledExpandBtn,
} from '../components/StyledComponents';
import { useSearch } from '../contexts/searchContext';
import {
  useCourseData,
  useFerry,
 // Listing,
} from '../components/Providers/FerryProvider';
import styles from './Worksheet.module.css';

import NoCoursesFound from '../images/no_courses_found.svg';
import ErrorPage from '../components/ErrorPage';
import { useParams } from 'react-router-dom';

import { useWindowDimensions } from '../components/Providers/WindowDimensionsProvider';
import { useWorksheet } from '../contexts/worksheetContext';
import * as Sentry from '@sentry/react';

import styled from 'styled-components';

const StyledCalendarContainer = styled(SurfaceComponent)`
  transition: border-color ${({ theme }) => theme.trans_dur},
    background-color ${({ theme }) => theme.trans_dur},
    color ${({ theme }) => theme.trans_dur};
`;
/**
 * Renders worksheet page
 */

function Course_comp() {
  const { showModal, hideModal } = useSearch();
  // State that determines if a course modal needs to be displayed and which course to display
  const [course_modal, setCourseModal] =
    useState < (string | boolean | Listing) > [false, ''];

  const { season, crn, course_code } = useParams(); // Access season and crn from URL parameters
  const [filter, setFilter] = useState('both');
  const {
    loading: coursesLoading,
    courses: courseData,
    error: courseLoadError,
  } = useCourseData([season]);
  // wait for use course data  to load before moving on
  useEffect(() => {
    if (coursesLoading) return;
    if (courseLoadError) {
      Sentry.captureException(courseLoadError);
      return;
    }
    console.log(courseData[season].get(parseInt(crn)));
    setCourseModal([true, courseData[season].get(parseInt(crn))]);
  }, [coursesLoading]);

  // Current listing that we are viewing overview info for

  // Render content based on season and crn values
  return (
    <div>
      <h1>Season: {season}</h1>
      <h1>CRN: {crn}</h1>
      <h1>Course Code: {course_code}</h1>
      {/* Course Modal */}
      <CourseModal
        hideModal={hideModal}
        show={course_modal[0]}
        listing={course_modal[1]}
      />
    </div>
  );
}

export default Course_comp;
