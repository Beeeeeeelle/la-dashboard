export interface IndicatorGroup {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  indicators: Indicator[];
}

export interface Indicator {
  name: string;
  advanced?: boolean;
}

export const groups: IndicatorGroup[] = [
  {
    id: "activity",
    number: "1",
    title: "Student Activity Metrics",
    subtitle: "How students move through and engage with the course environment",
    indicators: [
      { name: "Weekly login frequency" },
      { name: "Last login date / time" },
      { name: "Average session duration" },
      { name: "Total weekly time-on-course" },
      { name: "Pages viewed per session" },
      { name: "Click path sequence", advanced: true },
    ],
  },
  {
    id: "grades",
    number: "2",
    title: "Grade Analytics",
    subtitle: "Performance data at individual and course level",
    indicators: [
      { name: "Individual assignment score" },
      { name: "Class-wide score distribution" },
      { name: "Student grade trend over time" },
      { name: "Pass / fail rate" },
      { name: "Average score per assignment" },
      { name: "Score comparison across sections / semesters" },
    ],
  },
  {
    id: "discussion",
    number: "3",
    title: "Discussion Analytics",
    subtitle: "Social and communicative engagement in online discussions",
    indicators: [
      { name: "Total posts per student" },
      { name: "Reply count / thread depth" },
      { name: "Average word count per post" },
      { name: "First post timing (day / time)" },
      { name: "Participation distribution (who posted / who didn't)" },
      { name: "Sentiment analysis of posts", advanced: true },
    ],
  },
  {
    id: "content",
    number: "4",
    title: "Content Interaction Data",
    subtitle: "How students engage with learning materials",
    indicators: [
      { name: "Number of times a resource was accessed" },
      { name: "Video completion rate" },
      { name: "Video pause / replay points", advanced: true },
      { name: "File / document download count" },
      { name: "Time spent on each page" },
      { name: "Resources never accessed by any student" },
    ],
  },
  {
    id: "benchmark",
    number: "5",
    title: "Comparative / Benchmarking Data",
    subtitle: "Contextualizing your course against other sections or semesters",
    indicators: [
      { name: "This section vs. previous semesters" },
      { name: "This section vs. concurrent sections" },
      { name: "Individual score vs. class average" },
      { name: "Retention / completion rate across sections" },
    ],
  },
  {
    id: "predictive",
    number: "6",
    title: "Predictive Analytics",
    subtitle: "Forward-looking signals to support early intervention",
    indicators: [
      { name: "At-risk student flag" },
      { name: "Early warning alert / notification" },
      { name: "Predicted final grade", advanced: true },
      { name: "Dropout risk score", advanced: true },
      { name: "Engagement risk score", advanced: true },
    ],
  },
  {
    id: "progress",
    number: "7",
    title: "Progress Tracking",
    subtitle: "Individual learner trajectories through course structure",
    indicators: [
      { name: "Module completion rate" },
      { name: "Milestone / checkpoint achievement" },
      { name: "Time taken to complete each module" },
      { name: "Number of overdue / incomplete items" },
      { name: "Overall course progress view (all students)" },
    ],
  },
  {
    id: "assignment",
    number: "8",
    title: "Assignment Behavior & Feedback",
    subtitle: "How students manage and respond to assignments and instructor feedback",
    indicators: [
      { name: "Submission timing (early / on-time / late)" },
      { name: "Late submission rate (class-wide)" },
      { name: "Number of resubmissions / revisions" },
      { name: "Feedback read / opened record", advanced: true },
      { name: "Time spent reading feedback", advanced: true },
    ],
  },
];
