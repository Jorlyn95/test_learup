import { Injectable } from "@nestjs/common"
import { MysqlCustom } from "src/class/mysql"
import { changeBoosEmployer, listChangeInterface, saveEmployersInterface, updateEmployersInterface } from "src/interfaces/employers"

@Injectable()
export class empleadosServices {
    mysql = new MysqlCustom()

    async getList(): Promise<any> {

        return await this.mysql.ExecuteQuery({
            Query: "call get_employers()",
            Params: []
        }).then((res) => {
            return {
                status: "Ok",
                data: res
            }
        })
            .catch((error) => {
                console.log(error)
            })

    }

    async createEmployer({
        nombre,
        apellido,
        cedula,
        jefe
    }: saveEmployersInterface): Promise<any> {

        try {

            return await this.mysql.ExecuteQuery({
                Query: "call create_employer(?,?,?,?)",
                Params: [nombre, apellido, cedula, jefe]
            }).then((res) => {
                return {
                    status: "Ok",
                    data: res
                }
            })
                .catch((error) => {
                    console.log(error)
                })


        } catch (error) {
            console.log(error)
        }

    }

    async updateEmployer({
        nombre,
        apellido,
        cedula,
        id
    }: updateEmployersInterface): Promise<any> {

        try {

            return await this.mysql.ExecuteQuery({
                Query: "call update_employer(?,?,?,?)",
                Params: [nombre, apellido, cedula, id]
            }).then((res) => {
                return {
                    status: "Ok",
                    data: res
                }
            })
                .catch((error) => {
                    console.log(error)
                })


        } catch (error) {
            console.log(error)
        }

    }

    async changeBoos({ empleado, boss }: changeBoosEmployer) {
        try {

            return await this.mysql.ExecuteQuery({
                Query: "call change_boss(?,?)",
                Params: [boss, empleado]
            }).then((res) => {
                return {
                    status: "Ok",
                    data: res
                }
            })
                .catch((error) => {
                    console.log(error)
                })


        } catch (error) {
            console.log(error)
        }
    }

    async listChanges({id_empleado}:listChangeInterface){
        try {
            return await this.mysql.ExecuteQuery({
                Query:"call list_changes(?)",
                Params:[id_empleado]
            }).then((res)=>{
                return {
                    status:"Ok",
                    data:res
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}