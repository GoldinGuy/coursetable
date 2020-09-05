import React from 'react';
import { Row } from 'react-bootstrap';
import styles from './RatingsGraph.module.css';

/**
 * Displays Evaluation Graphs
 * @prop ratings - list that holds the counts for each rating 1-5
 * @prop reverse - boolean of whether or not to reverse the colors
 */

const RatingsGraph = ({ ratings, reverse }) => {
  let max_val = 1;
  // Find the maximum count for a rating
  ratings.forEach((rating) => {
    max_val = Math.max(rating, max_val);
  });

  // Bar chart colors
  const colors = ['#f54242', '#f5a142', '#f5f542', '#aeed1a', '#00e800'];
  // Reverse colors if needed
  if (reverse) colors.reverse();

  // Holds the bars
  let columns = [];
  // Variables used for list keys
  let indx = 0;
  // Set minimum bar height
  const MIN_HEIGHT = 15;
  // Loop through each rating to build the bar
  ratings.forEach((rating) => {
    // Calculate height of the bar
    const height = rating ? MIN_HEIGHT + (rating / max_val) * 100 : 0;
    // Skip to last color if this is the yes/no question
    if (indx === 1 && ratings.length === 2) indx = 4;
    // Build bar
    columns.push(
      <div key={indx} className={styles.bar}>
        {/* Number of votes for each rating */}
        <p className={styles.value + ' m-0 '}>{rating}</p>
        {/* Bar */}
        <div
          className={styles.column + ' px-1 mx-3'}
          style={{
            backgroundColor: colors[indx],
            height: height.toString() + 'px',
          }}
        />
        {/* Rating labels */}
        {ratings.length === 2 && (
          <p className={styles.value + ' m-0 ' + styles.xaxis_label}>
            {indx === 0 ? 'yes' : 'no'}
          </p>
        )}
        {ratings.length === 5 && (
          <p className={styles.value + ' m-0 ' + styles.xaxis_label}>
            {indx + 1}
          </p>
        )}
      </div>
    );
    indx++;
  });

  return (
    <Row
      className={
        styles.container +
        ' mx-auto pl-3 pr-3 mb-4 justify-content-center align-items-end'
      }
    >
      {columns}
    </Row>
  );
};

export default RatingsGraph;