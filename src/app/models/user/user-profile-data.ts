export interface UserProfileData {
    uuid:                  string;
    name:                  string;
    surname:               string;
    username:              string;
    enterpriseInfoHomeDTO: EnterpriseInfoHomeDTO;
    country:                  string;
    phoneNumber:                  string;
    description:                  string;
}

export interface EnterpriseInfoHomeDTO {
    uuid: string;
    name: string;
}