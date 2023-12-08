import { Controller, Get } from '@nestjs/common';
import { statusJefesService } from './status_jefe.service';

@Controller('/api/v1/status_jefe')
export class StatusJefeController {
    constructor(private readonly appService: statusJefesService) {}

    @Get()
    async getList(){
        return await this.appService.getList();
    }

}
