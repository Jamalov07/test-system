import { PartialType } from '@nestjs/swagger';
import { CreateStuffSubjectDto } from './create-stuff_subject.dto';

export class UpdateStuffSubjectDto extends PartialType(CreateStuffSubjectDto) {}
