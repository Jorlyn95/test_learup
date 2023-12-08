import { Controller, Post, Get, Body, HttpException, HttpStatus, Put, Query  } from '@nestjs/common';
import { empleadosServices } from './empleados.service';

@Controller('/api/v1/empleados')
export class EmpleadosController {

    constructor(private readonly appService: empleadosServices){}

    @Get()
    async get(){
        return await this.appService.getList()
    }

    @Get("/changes")
    async getChanges(@Query() body:any){
        let {id_empleado}=body
        if(!id_empleado) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST)
        return this.appService.listChanges({id_empleado})
    }

    @Post()
    async save(@Body() body:any){
        let {nombre, apellido, cedula, jefe}=body

        if(!nombre || !apellido || !cedula || !jefe) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST);

        return await this.appService.createEmployer({nombre, apellido, cedula, jefe})
    }

    @Put()
    async update(@Body() body:any){
        let {nombre, apellido, cedula, id}=body

        if(!nombre || !apellido || !cedula || !id) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST);

        return await this.appService.updateEmployer({nombre, apellido, cedula, id})
    }

    @Put("/change_boss")
    async updateBoss(@Body() body:any){
        let {id, jefe}=body

        if(!id || !jefe) throw new  HttpException("Missing params", HttpStatus.BAD_REQUEST);

        return await this.appService.changeBoos({empleado:id, boss:jefe})
    }

}
