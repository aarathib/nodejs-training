
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDTO } from "./CreateAddressDto";

export class CreateDepartmentDto {
    @IsString()
    public name: string;
}