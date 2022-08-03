
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class CreateAddressDTO {
    @IsString()
    public addr1: string;

    @IsString()
    public addr2: string;

    @IsString()
    public city: string;

    @IsString()
    public state: string;

    @IsString()
    public country: string;

    @IsString()
    public pincode: string;

    // @ValidateNested({ each:true})
    // @Type(()=> CreateAddressDTO)
    // address: CreateAddressDTO
    // Validating nested objects 
//  @ValidateNested({ each: true })
//  @Type(() => <Your nested DTO>)
}
