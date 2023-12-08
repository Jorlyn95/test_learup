import { Injectable } from "@nestjs/common"
import { MysqlCustom } from "src/class/mysql"
import { createJefeInterface, updateJefeInterface } from "src/interfaces/jefes"

@Injectable()
export class jefeService {
    mysql = new MysqlCustom()

    async getList(): Promise<any> {

        return await this.mysql.ExecuteQuery({
            Query: "SELECT * FROM Jefes ",
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

    async createBoss({
        nombre,
        apellido,
        cargo
    }: createJefeInterface): Promise<any> {

        try {

            return await this.mysql.ExecuteQuery({
                Query: "call create_boss(?,?,?)",
                Params: [nombre, apellido, cargo]
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

    async updateBoss({
        nombre,
        apellido,
        cargo,
        id
    }: updateJefeInterface): Promise<any> {

        try {
            console.log({nombre, apellido, cargo, id})
            return await this.mysql.ExecuteQuery({
                Query: "call update_boss(?,?,?,?)",
                Params: [nombre, apellido, cargo, id]
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

}