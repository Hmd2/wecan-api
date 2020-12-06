import { ApiProperty } from "@nestjs/swagger";

export class Trip {
    constructor(
        public id: string,
        public city: string,
        public activities: string
    ){}
}