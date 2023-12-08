import { Module } from '@nestjs/common';
import { StatusJefeController } from './status_jefe/status_jefe.controller';
import { EmpleadosController } from './empleados/empleados.controller';
import { JefesController } from './jefes/jefes.controller';
import { statusJefesService } from './status_jefe/status_jefe.service';
import { empleadosServices } from './empleados/empleados.service';
import { jefeService } from './jefes/jefe.service';

@Module({
  imports: [],
  controllers: [StatusJefeController, EmpleadosController, JefesController],
  providers: [statusJefesService, empleadosServices, jefeService],
})
export class AppModule {}
