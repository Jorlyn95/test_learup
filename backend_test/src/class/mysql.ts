import { Pool, createPool } from 'mysql2';
import { QueryInterface } from 'src/interfaces/mysql';

export class MysqlCustom {

    private connection: Pool

    access: any = {
        user: "root",
        password: "jorlyn95",
        host: "localhost",
        port: 3306,
        database: "test_learup",
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    };

    constructor() {
        this.connection = createPool(this.access);
    }

    ExecuteQuery({ Query, Params }: QueryInterface): Promise<any> {
        return new Promise((resolve, rejects) => {
            try {
                
                this.connection.getConnection((error, con)=>{

                    if(error){
                        console.log(error)
                        rejects(error)
                        return
                    }

                    con.query(Query, Params, (error, result, field)=>{

                        if(error){
                            console.log(error)
                            rejects(error)
                            return
                        }
                       resolve(result)
                       this.connection.releaseConnection(con)
                       return
                    })

                })

            } catch (error) {
                console.log(error)
                rejects(error)
            }
        })
    }

}