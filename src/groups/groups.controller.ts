import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Group } from './entities/group.entity';

@ApiBearerAuth()
@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: 201, type: Group })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 201, type: [Group] })
  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @ApiOperation({ summary: 'Get group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Get group by id' })
  @ApiResponse({ status: 200, description: 'Group deleted' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
