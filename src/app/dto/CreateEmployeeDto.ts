
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateAddressDTO } from "./CreateAddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public joindate: string;

    @IsString()
    public status: string;

    @IsString()
    public role: string;


    @ValidateNested({ each:true})
    @Type(()=> CreateAddressDTO)
    address: CreateAddressDTO


}