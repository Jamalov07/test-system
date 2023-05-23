import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber,IsNotEmpty } from "class-validator";

export class LoginStudentDto {
    @ApiProperty({example:'Login11',description:"login of student"})
    @IsNotEmpty()
    @IsString()
    readonly login:string;
    @ApiProperty({example:'Password11',description:"password of student"})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}