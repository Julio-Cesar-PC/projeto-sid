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
    
    await client.query(`DROP TABLE gols;`)
    console.log('Deleted table `gols`')

    await client.query(`DROP TABLE adonis_schema;`)
    console.log('Deleted table `adonis_schema`')

    await client.query(`DROP TABLE adonis_schema_versions;`)
    console.log('Deleted table `adonis_schema_versions`')
    
    await client.end()

    console.log('Wiped db')
  }
}
