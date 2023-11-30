import { BaseCommand } from '@adonisjs/core/build/standalone'
import { Pool, Client } from 'pg'

export default class WipeMaster extends BaseCommand {

  public static commandName = 'db:wipemaster'
  public static description = 'Comando para fazer uma conexão manual ao banco master para deletar toda a tabela gols.'

  public static settings = {
    loadApp: false,
    stayAlive: false,
  }

  public async run() {
    const user = 'postgres'
    const password = 'postgres'
    const host = 'postgresql-master'
    const db_name = 'gols'
    const connectionString = `postgresql://${user}:${password}@${host}/${db_name}`
    
    const pool = new Pool({
      connectionString,
    })
    
    await pool.query('SELECT NOW()')
    await pool.end()
    
    const client = new Client({
      connectionString,
    })
    
    await client.connect()
    
    await client.query(`DROP SCHEMA public CASCADE;`)
    
    await client.end()

    console.log('WIPED')
  }
}
