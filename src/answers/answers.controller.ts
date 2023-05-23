import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Answer } from './entities/answer.entity';

@ApiBearerAuth()
@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: 'Create answer' })
  @ApiResponse({ status: 201, type: Answer })
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @ApiOperation({ summary: 'Get answers' })
  @ApiResponse({ status: 200, type: [Answer] })
  @Get()
  findAll() {
    return this.answersService.findAll();
  }

  @ApiOperation({ summary: 'Get answer by id' })
  @ApiResponse({ status: 200, type: Answer })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update answer' })
  @ApiResponse({ status: 200, type: Answer })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(+id, updateAnswerDto);
  }

  @ApiOperation({ summary: 'Delete answer' })
  @ApiResponse({ status: 200, description: 'answer deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answersService.remove(+id);
  }
}
