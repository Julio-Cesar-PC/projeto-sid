import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gol extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public data: Date

  @column()
  public time_casa: string

  @column()
  public time_visitante: string

  @column()
  public time: string

  @column()
  public jogador: string

  @column()
  public minuto: number

  @column()
  public contra: boolean

  @column()
  public penalti: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
