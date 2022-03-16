import React, { useState, useMemo, useCallback } from 'react';
import { Tab, Row, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import styles from './EvaluationResponses.module.css';
import { StyledInput, TextComponent } from '../StyledComponents';
import { SearchEvaluationNarrativesQuery } from '../../generated/graphql';
import Mark from 'mark.js';
import chroma from 'chroma-js';

// Color gradient for evaluation sentiment scores
const positivityColormap = chroma
  .scale(['#f54242', '#f5f542', '#00E800'])
  .domain([-1, 1]);

// Tabs of evaluation comments in modal
const StyledTabs = styled(Tabs)`
  background-color: ${({ theme }) => theme.surface[0]};
  font-weight: 500;
  position: sticky;
  top: -1rem;
  .active {
    background-color: ${({ theme }) => `${theme.surface[0]} !important`};
    color: #468ff2 !important;
    border-bottom: none;
  }
  .nav-item {
    color: ${({ theme }) => theme.text[0]};
  }
  .nav-item:hover {
    background-color: ${({ theme }) => theme.banner};
    color: ${({ theme }) => theme.text[0]};
  }
`;

// Row for each comment
const StyledCommentRow = styled(Row)<{
  compound: number;
  colormap: chroma.Scale<chroma.Color>;
}>`
  font-size: 14px;
  font-weight: 450;
  border-bottom: 1px solid ${({ theme }) => theme.multivalue};
  border-left: 3px solid ${({ compound, colormap }) => colormap(compound).css()};
`;

// Bubble to choose sort order
const StyledSortOption = styled.span`
  padding: 3px 5px;
  background-color: ${(
    // @ts-ignore
    { theme, active }
  ) => (active ? 'rgba(92, 168, 250,0.5)' : theme.border)};
  color: ${(
    // @ts-ignore
    { theme, active }
  ) => (active ? theme.text[0] : theme.text[2])};
  font-weight: 500;
  &:hover {
    background-color: ${(
      // @ts-ignore
      { theme, active }
    ) => (active ? 'rgba(92, 168, 250,0.5)' : theme.multivalue)};
    cursor: pointer;
  }
`;

/**
 * Displays Evaluation Comments
 * @prop crn - integer that holds current listing's crn
 * @prop info - dictionary that holds the eval data for each question
 */

const EvaluationResponses: React.FC<{
  crn: number;
  info?: SearchEvaluationNarrativesQuery['computed_listing_info'];
}> = ({ crn, info }) => {
  // Sort by what order?
  const [sort_order, setSortOrder] = useState('length');

  const sortByLength = useCallback((responses) => {
    for (const key in responses) {
      responses[key].sort(function (
        a: { comment: string; comment_compound: number },
        b: { comment: string; comment_compound: number }
      ) {
        return b.comment.length - a.comment.length;
      });
    }
    return responses;
  }, []);

  // sort responses by the compound sentiment score
  const sortByPositivity = useCallback((responses) => {
    const neg_responses = JSON.parse(JSON.stringify(responses));
    for (const key in responses) {
      responses[key].sort(function (
        a: { comment_compound: number },
        b: { comment_compound: number }
      ) {
        return b.comment_compound - a.comment_compound;
      });
      for (let i = 0; i < responses[key].length; i++) {
        neg_responses[key][i] = {
          comment: responses[key][responses[key].length - 1 - i].comment,
          comment_compound:
            responses[key][responses[key].length - 1 - i].comment_compound,
        };
      }
    }
    return [responses, neg_responses];
  }, []);

  // Dictionary that holds the comments for each question
  const [
    responses,
    sorted_responses,
    pos_sorted_responses,
    neg_sorted_responses,
  ] = useMemo(() => {
    const temp_responses: {
      [key: string]: { comment: string; comment_compound: number }[];
    } = {};
    // Loop through each section for this course code
    (info || []).forEach((section) => {
      const crn_code = section.crn;
      // Only fetch comments for this section
      if (crn_code !== crn) return;
      const { nodes } = section.course.evaluation_narratives_aggregate;
      // Return if no comments
      if (!nodes.length) return;
      // Add comments to responses and sentiments dictionary
      nodes.forEach((node) => {
        if (node.evaluation_question.question_text && node.comment) {
          if (!temp_responses[node.evaluation_question.question_text]) {
            temp_responses[node.evaluation_question.question_text] = [];
          }
          temp_responses[node.evaluation_question.question_text].push({
            comment: node.comment,
            comment_compound: node.comment_compound as number,
          });
        }
      });
    });
    const [pos_responses, neg_responses] = sortByPositivity(
      JSON.parse(JSON.stringify(temp_responses))
    );
    return [
      temp_responses,
      // Deep copy temp_responses and sort by length
      sortByLength(JSON.parse(JSON.stringify(temp_responses))),
      // Deep copy temp_responses and sort by sentiment
      pos_responses,
      neg_responses,
    ];
  }, [info, crn, sortByLength, sortByPositivity]);

  // Number of questions
  const num_questions = Object.keys(responses).length;

  const [filter, setFilter] = useState('');

  // Generate HTML to hold the responses to each question
  const [recommend, skills, strengths, summary] = useMemo(() => {
    // Lists that hold the html for the comments for a specific question
    let temp_recommend = [];
    let temp_skills = [];
    let temp_strengths = [];
    let temp_summary = [];
    let cur_responses;
    switch (sort_order) {
      case 'positivity':
        cur_responses = pos_sorted_responses;
        break;
      case 'negativity':
        cur_responses = neg_sorted_responses;
        break;
      default:
        cur_responses = sorted_responses;
    }
    // Populate the lists above
    const genTemp = (resps: any) => {
      if (resps.length === 0) {
        return resps;
      }
      const filteredResps = resps
        .filter(
          (
            response: { comment: string; comment_compound: number },
            index: number
          ) => {
            return response.comment
              .toLowerCase()
              .includes(filter.toLowerCase());
          }
        )
        .map(
          (
            response: { comment: string; comment_compound: number },
            index: number
          ) => (
            <StyledCommentRow
              key={index}
              className="m-auto p-2 responses"
              colormap={positivityColormap}
              compound={response.comment_compound}
            >
              <TextComponent type={1}>{response.comment}</TextComponent>
            </StyledCommentRow>
          )
        );
      if (filteredResps.length === 0) {
        return [
          <StyledCommentRow key={0} className="m-auto p-2">
            <TextComponent type={1}>No matches found.</TextComponent>
          </StyledCommentRow>,
        ];
      }
      return filteredResps;
    };
    for (const key in cur_responses) {
      if (key.includes('summarize')) {
        temp_summary = genTemp(cur_responses[key]);
      } else if (key.includes('recommend')) {
        temp_recommend = genTemp(cur_responses[key]);
      } else if (key.includes('skills')) {
        temp_skills = genTemp(cur_responses[key]);
      } else if (key.includes('strengths')) {
        temp_strengths = genTemp(cur_responses[key]);
      }
    }
    return [temp_recommend, temp_skills, temp_strengths, temp_summary];
  }, [
    sort_order,
    sorted_responses,
    pos_sorted_responses,
    neg_sorted_responses,
    filter,
  ]);

  const context = document.querySelectorAll('.responses');
  const instance = new Mark(context);

  return (
    <div>
      <StyledInput
        id="filter-input"
        type="text"
        placeholder="Search evaluations..."
        value={filter}
        style={{ marginBottom: '5px' }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFilter(event.target.value);
          instance.unmark({
            done() {
              instance.mark(event.target.value);
            },
          });
        }}
      />
      <Row className={`${styles.sort_by} mx-auto mb-2 justify-content-center`}>
        <span className="font-weight-bold my-auto mr-2">Sort comments by:</span>
        <div className={styles.sort_options}>
          <StyledSortOption
            // @ts-ignore
            active={sort_order === 'length'}
            onClick={() => setSortOrder('length')}
          >
            length
          </StyledSortOption>
          <StyledSortOption
            // @ts-ignore
            active={sort_order === 'positivity'}
            onClick={() => setSortOrder('positivity')}
          >
            positivity
          </StyledSortOption>
          <StyledSortOption
            // @ts-ignore
            active={sort_order === 'negativity'}
            onClick={() => setSortOrder('negativity')}
          >
            negativity
          </StyledSortOption>
        </div>
      </Row>
      <StyledTabs
        variant="tabs"
        transition={false}
        onSelect={() => {
          // Scroll to top of modal when a different tab is selected
          document
            .querySelector('.modal-body')
            ?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      >
        {/* Recommend Question */}
        {recommend.length !== 0 && (
          <Tab eventKey="recommended" title="Recommend?">
            <Row className={`${styles.question_header} m-auto pt-2`}>
              <TextComponent type={0}>
                Would you recommend this course to another student? Please
                explain.
              </TextComponent>
            </Row>
            {recommend}
          </Tab>
        )}
        {/* Knowledge/Skills Question */}
        {skills.length !== 0 && (
          <Tab eventKey="knowledge/skills" title="Skills">
            <Row className={`${styles.question_header} m-auto pt-2`}>
              <TextComponent type={0}>
                What knowledge, skills, and insights did you develop by taking
                this course?
              </TextComponent>
            </Row>
            {skills}
          </Tab>
        )}
        {/* Strengths/Weaknesses Question */}
        {strengths.length !== 0 && (
          <Tab eventKey="strengths/weaknesses" title="Strengths/Weaknesses">
            <Row className={`${styles.question_header} m-auto pt-2`}>
              <TextComponent type={0}>
                What are the strengths and weaknesses of this course and how
                could it be improved?
              </TextComponent>
            </Row>
            {strengths}
          </Tab>
        )}
        {/* Summarize Question */}
        {summary.length !== 0 && (
          <Tab eventKey="summary" title="Summary">
            <Row className={`${styles.question_header} m-auto pt-2`}>
              <TextComponent type={0}>
                How would you summarize this course? Would you recommend it to
                another student? Why or why not?
              </TextComponent>
            </Row>
            {summary}
          </Tab>
        )}
      </StyledTabs>
      {!num_questions && <strong>No comments for this course</strong>}
    </div>
  );
};

export default EvaluationResponses;
