export interface NikoNikoSurvey {
    idSurvey: number
    numberOfActivity: number
    activityAvailable: ActivityAvailable
  }
  
export interface ActivityAvailable {
    question: string
    answer: string
    descriptionFeeling:string
}