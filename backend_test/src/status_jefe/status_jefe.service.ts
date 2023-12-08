import { Injectable } from "@nestjs/common"
import { MysqlCustom } from "src/class/mysql"

@Injectable()
export class statusJefesService{
    mysql=new MysqlCustom() 

  async getList(): Promise<any> {

    return await this.mysql.ExecuteQuery({
      Query:"SELECT * FROM Status_Jefes ",
      Params:[]
    }).then((res)=>{
      return {
        status:"Ok",
        data:res
      }
    })
    .catch((error)=>{
      console.log(error)
    })

  }
}