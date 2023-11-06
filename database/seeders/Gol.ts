import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import fs from 'fs'
import Papa from 'papaparse'
import Gol from 'App/Models/Gol'


export default class extends BaseSeeder {
  public async run () {
    let golsDump = fs.readFileSync('goalscorers.csv', 'utf8')
    let parsed = Papa.parse(golsDump, { header: true })

    let parsedDataArray = parsed.data

    // Mantém todos os registros em memória e depois adiciona
    // todos ao mesmo tempo para o banco
    let golsArray: Gol[] = []
    
    for (let i = 0; i < parsedDataArray.length; i++) {
      const element = parsedDataArray[i]
      if (!element || element.date == '') break
      const gol = new Gol()
      gol.fill({
        data: element.date,
        time_casa: element.home_team,
        time_visitante: element.away_team,
        time: element.team,
        jogador: element.scorer,
        minuto: element.minute,
        contra: element.own_goal,
        penalti: element.penalty
      })      
      golsArray.push(gol)
    }

    await Gol.createMany(golsArray)
  }  
}
