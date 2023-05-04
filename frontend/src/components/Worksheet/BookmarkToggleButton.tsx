import React, { useMemo, useState, useEffect, useCallback } from 'react';
import './BookmarkToggleButton.css';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import posthog from 'posthog-js';
import styled from 'styled-components';
import { useUser } from '../../contexts/userContext';
import { setLSObject } from '../../browserStorage';
import { isInSaved } from '../../utilities/courseUtilities';
import { useWindowDimensions } from '../Providers/WindowDimensionsProvider';
import * as Sentry from '@sentry/react';

import { API_ENDPOINT } from '../../config';
import { useWorksheet } from '../../contexts/worksheetContext';

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.primary}!important;
  &:hover {
    opacity: 0.5;
  }
`;

/**
 * Toggle button to add course to or remove from worksheet
 * @prop crn - number | integer that holds the crn of the current course
 * @prop season_code - string | holds the current season code
 * @prop modal - boolean | are we rendering in the course modal
 * @prop setCourseInSaved - function | to set if current course is in user's worksheet for parent component
 */
function BookmarkToggleButton({
  crn,
  season_code,
  modal,
  course_code,
  setCourseInSaved,
}: {
  crn: number;
  season_code: string;
  modal: boolean;
  course_code: string;
  setCourseInSaved: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Fetch user context data and refresh function
  const { user, userRefresh, fbRefresh, savedRefresh } = useUser();

  const saved_check = useMemo(() => {
    return isInSaved(crn.toString(), user.saved);
  }, [crn, user.saved]);
  // Is the current course in the worksheet?
  const [inSaved, setInSaved] = useState(false);

  // Fetch width of window
  const { isLgDesktop } = useWindowDimensions();

  // Reset inSaved state on every rerender
  useEffect(() => {
    if (inSaved !== saved_check) {
      setInSaved(saved_check);
      if (setCourseInSaved) setCourseInSaved(saved_check);
    }
  }, [saved_check, inSaved, setCourseInSaved]);

  // Handle button click
  const toggleWorkSheet = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      posthog.capture('worksheet-add-remove', { season_code, crn });

      // Determine if we are adding or removing the course
      const add_remove = inSaved ? 'remove' : 'add';

      // removes removed courses from worksheet hidden courses
      //console.log(user.saved, add_remove);

      // Call the endpoint
      return axios
        .post(
          `${API_ENDPOINT}/api/user/saveClass`,
          {
            action: add_remove,
            season: season_code,
            ociId: crn,
            course_code: course_code,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          // Refresh user's worksheet
          return savedRefresh();
        })
        .then(() => {
          // If not in worksheet view, update inSaved state
          setInSaved(!inSaved);
        })
        .catch((err) => {
          toast.error('Failed to update worksheet');
          Sentry.captureException(err);
        });
    },
    [season_code, crn, course_code, inSaved, user.saved, savedRefresh]
  );

  // Disabled worksheet add/remove button if not logged in
  if (user.worksheet == null)
    return (
      <Button onClick={toggleWorkSheet} className="p-0 disabled-button">
        <BsBookmark size={25} className="disabled-button-icon" />
      </Button>
    );

  // Render remove/add message on hover
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      <small>
        {inSaved ? 'Unsave course' : 'Save course for future years'}
      </small>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 1000, hide: 0 }}
      overlay={renderTooltip}
    >
      <StyledButton
        variant="toggle"
        className="py-auto px-1 d-flex align-items-center"
        onClick={toggleWorkSheet}
      >
        {/* Show bookmark icon on modal and +/- everywhere else */}
        {modal ? (
          inSaved ? (
            <BsBookmarkFill size={25} className="scale_icon" />
          ) : (
            <BsBookmark size={25} className="scale_icon" />
          )
        ) : inSaved ? (
          <BsBookmarkFill size={isLgDesktop ? 16 : 14} />
        ) : (
          <BsBookmark size={isLgDesktop ? 16 : 14} />
        )}
      </StyledButton>
    </OverlayTrigger>
  );
}

// WorksheetToggleButton.whyDidYouRender = true;
export default React.memo(BookmarkToggleButton);
