export type Direction = {
  direction_id: number;
  name_direction: string;
  number_direction: string;
  plan: number;
  subjects: { min_result: number; name_subject: string; subject_id: number }[];
};

export type Faculty = {
  faculty_id: number;
  name_faculty: string;
  directions: Direction[];
};

export type CompetititonListItem = {
  direction_enrollee_id: number;
  direction_id: number;
  name_direction: string;
  enrollee_id: number;
  full_name: string;
  exam_score: number;
  achievement_bonus: number;
  total_score: number;
  subjects: {
    name: string;
    score: number;
  }[];
  achievements: {
    name: string;
    bonus: number;
  }[];
};
