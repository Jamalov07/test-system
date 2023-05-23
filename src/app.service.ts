import { Injectable } from '@nestjs/common';
import { FilesService } from './files/files.service';

@Injectable()
export class AppService {
    constructor(private readonly fileService: FilesService) {}

    async fileUploadService(image:string){
        const fileName = await this.fileService.createFile(image);
        const resp = String(process.env.BASE_URL)+'/'+fileName;
        return resp;
        
    }
}
