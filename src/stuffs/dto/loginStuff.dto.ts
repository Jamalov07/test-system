import { ApiProperty } from "@nestjs/swagger";
import { IsOptional,IsString,IsNumber } from "class-validator";

export class LoginStuffDto {
    @ApiProperty({example:'username2',description:'name of stuff'})
    @IsString()
    readonly username: string;
    @ApiProperty({example:'password2',description:'password of stuff'})
    @IsString()
    readonly password: string;
}