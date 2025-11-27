export enum MathLevel {
  BEGINNER = 'No formal background',
  INTERMEDIATE = 'Comfortable with basic Statistics',
  ADVANCED = 'Advanced (Calculus, Linear Algebra)'
}

export enum CodingLevel {
  NONE = 'No coding experience',
  BASIC = 'Basic (Python/Scripting)',
  ADVANCED = 'Advanced (Software Engineering/ML)'
}

export interface UserContext {
  mathLevel: MathLevel;
  codingLevel: CodingLevel;
  specificInterest: string;
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  GENERATING = 'GENERATING',
  READING = 'READING'
}
