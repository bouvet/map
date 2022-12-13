export interface ISession {
    id: string;
    registered: Date;
    locationTitle: string;
    locationId: string;
    userId: string;
}

export interface ISessionType {
    id: string;
    registered?: Date;
    locationTitle?: string;
    locationId: string;
    userId: string;
}

export interface ISessionTypeGet {
    id: string;
    registered?: Date;
    locationTitle?: string;
    locationId: string;
    userId: string;
}
