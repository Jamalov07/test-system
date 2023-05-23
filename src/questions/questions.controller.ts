import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: 'Create question' })
  @ApiResponse({ status: 201, type: Question })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, type: [Question] })
  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @ApiOperation({ summary: 'Get question by id' })
  @ApiResponse({ status: 200, type: Question })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update question by id' })
  @ApiResponse({ status: 200, type: Question })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @ApiOperation({ summary: 'Get question by id' })
  @ApiResponse({ status: 200, description: 'Question deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
