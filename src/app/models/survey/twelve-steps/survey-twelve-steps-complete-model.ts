export interface SurveyCompleteTwelveSteps {
    activities: Activity[]
    surveyState: string
}
  
export interface Activity {
    question: string
    answer: string
}