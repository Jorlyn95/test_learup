import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, } from '@nestjs/common';
import { jefeService } from './jefe.service';

@Controller('/api/v1/jefes')
export class JefesController {
    constructor(private readonly appService: jefeService){}

    @Get()
    async get(){
        return await this.appService.getList()
    }

    @Post()
    async save(@Body() body:any){
        let {nombre, apellido, cargo}=body

        if(!nombre || !apellido || !cargo) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST);

        return await this.appService.createBoss({nombre, apellido, cargo})
    }

    @Put()
    async update(@Body() body:any){
        let {nombre, apellido, cargo, id}=body

        if(!nombre || !apellido || !cargo || !id) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST);

        return await this.appService.updateBoss({nombre, apellido, cargo, id})
    }

}
