export interface SurveyTwelveSteps {
    idSurvey:     number;
    surveyState:  string;
    regularUser:  RegularUser;
    activityList: ActivityList[];
    module:       Module;

}

export interface ActivityList {
    question: string;
    answer:   string;
}

export interface Module {
    name:         string;
    creationDate: Date;
    moduleState:  string;
    team:         Team;
}

export interface Team {
    uuid:            string;
    nameTeam:        string;
    descriptionTeam: string;
    teamLeaderDTO:   RegularUser;
}

export interface RegularUser {
    uuid:     string;
    name:     string;
    surname:  string;
    username: string;
    password: string;
    teamDTO:  null;
}