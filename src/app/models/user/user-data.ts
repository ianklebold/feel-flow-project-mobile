export interface UserData {
    uuid:                  string;
    name:                  string;
    surname:               string;
    username:              string;
    enterpriseInfoHomeDTO: EnterpriseInfoHomeDTO;
}

export interface EnterpriseInfoHomeDTO {
    uuid: string;
    name: string;
}