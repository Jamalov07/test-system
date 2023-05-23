import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import { ApiOperation,ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stuff } from './entities/stuff.entity';
import { LoginStuffDto } from './dto/loginStuff.dto';

@Controller('stuffs')
@ApiTags('Stuff')
export class StuffsController {
  constructor(private readonly stuffsService: StuffsService) {}

  @ApiOperation({summary:"Registration for stuff, if role_id = 1 Superadmin,2=Admin,3-Teacher,4=Student"})
  @ApiResponse({status:201,type: Stuff})
  @Post()
  create(
    @Body() createStuffDto: CreateStuffDto,
  ) {
    return this.stuffsService.create(createStuffDto);
  }

  @ApiOperation({summary:"Get all stuffs"})
  @ApiResponse({status:200,type: [Stuff]})
  @Get()
  findAll() {
    return this.stuffsService.findAll();
  }

  @ApiOperation({summary:"Get stuff by id"})
  @ApiResponse({status:200,type: Stuff})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffsService.findOne(+id);
  }

  @ApiOperation({summary:"Update stuff"})
  @ApiResponse({status:202,type: Stuff})
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStuffDto: UpdateStuffDto,
  ) {
    return this.stuffsService.update(+id, updateStuffDto);
  }

  @ApiOperation({summary:"Delete stuff"})
  @ApiResponse({status:200,type:"Succesfully deleted"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffsService.remove(+id);
  }
  
  @ApiOperation({summary:"Login Stuff"})
  @ApiResponse({status:200,type:"access_token"})
  @Post('login')
  login(@Body() loginStuffdto: LoginStuffDto) {
    return this.stuffsService.login(loginStuffdto)
  }
}
