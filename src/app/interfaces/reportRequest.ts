import { Time } from "@angular/common";

export interface ReportRequest {
    userId: string;
    projectId: string;
    date: Date;
    beginningTime: string;
    endTime: string;
}

