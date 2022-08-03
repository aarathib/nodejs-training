
import {IsUUID} from "class-validator";

export class CreateUUIDDto {
    @IsUUID()
    public id: string;
}