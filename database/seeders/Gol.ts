import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import fs from 'fs'
import Papa from 'papaparse'
import Gol from 'App/Models/Gol'


export default class extends BaseSeeder {
  public async run () {
    let gols = fs.readFileSync('goalscorers.csv', 'utf8')
    let parsed = Papa.parse(gols, {header: true})

    let golsArray = parsed.data

    for (let i = 0; i < golsArray.length; i++) {
      const element = golsArray[i];
      await Gol.create({
        data: element.date,
        time_casa: element.home_team,
        time_visitante: element.away_team,
        time: element.team,
        jogador: element.scorer,
        minuto: element.minute,
        contra: element.own_goal,
        penalti: element.penalty
      })
    }
  }
}
