// A CourseInfo object, which looks like this:
// {
//   "id": number,
//   "name": string,
// }

// An AssignmentGroup object, which looks like this:
// {
//   "id": number,
//   "name": string,
//   // the ID of the course the assignment group belongs to
//   "course_id": number,
//   // the percentage weight of the entire assignment group
//   "group_weight": number,
//   "assignments": [AssignmentInfo],
// }

// Each AssignmentInfo object within the assignments array looks like this:
// {
//   "id": number,
//   "name": string,
//   // the due date for the assignment
//   "due_at": Date string,
//   // the maximum points possible for the assignment
//   "points_possible": number,
// }

// An array of LearnerSubmission objects, which each look like this:
// {
//     "learner_id": number,
//     "assignment_id": number,
//     "submission": {
//       "submitted_at": Date string,
//       "score": number
//     }
// }

const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

const LearnerSubmissions = [
  {
    learner_id: 1001,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 45,
    },
  },
  {
    learner_id: 1001,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-26",
      score: 135,
    },
  },
  {
    learner_id: 1001,
    assignment_id: 3,
    submission: {
      submitted_at: "3156-11-16",
      score: 490,
    },
  },
];

function calculateWeightedAverage(submissions, assignments) {
  let totalWeightedScore = 0;
  let totalPointsPossible = 0;

  submissions.forEach((submission) => {
    const assignment = assignments.find(
      (a) => a.id === submission.assignment_id
    );
    if (assignment && new Date(assignment.due_at) < new Date()) {
      totalWeightedScore +=
        (submission.submission.score / assignment.points_possible) *
        assignment.points_possible;
      totalPointsPossible += assignment.points_possible;
    }
  });

  return ((totalWeightedScore / totalPointsPossible) * 100).toFixed(2);
}

//  calculate  weighted average score
function processData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  const outputData = [];

  LearnerSubmissions.forEach((learner) => {
    const learnerData = {
      id: learner.learner_id,
      avg: calculateWeightedAverage(
        LearnerSubmissions.filter(
          (sub) => sub.learner_id === learner.learner_id
        ),
        AssignmentGroup.assignments
      ),
    };

    learnerData.assignmentScores = {};
    LearnerSubmissions.filter(
      (sub) => sub.learner_id === learner.learner_id
    ).forEach((sub) => {
      const assignment = AssignmentGroup.assignments.find(
        (a) => a.id === sub.assignment_id
      );
      if (assignment && new Date(assignment.due_at) < new Date()) {
        learnerData.assignmentScores[sub.assignment_id] =
          (sub.submission.score / assignment.points_possible) * 100;
      }
    });

    outputData.push(learnerData);
  });

  return outputData;
}

const output = processData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(output);
