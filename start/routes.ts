/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import Gol from 'App/Models/Gol'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/', async () => {
  return { "node": Env.get('NODE')}
})

Route.get('/gols', async ({request}: HttpContextContract) => {
  let { page, perPage } = request.qs()
  if(!page) page = 1;
  if(!perPage) perPage = 10;
  return await Gol.query().orderBy('data', 'desc')
})

Route.get('/gols/:id', async ({ params }) => {
  return await Gol.findOrFail(params.id)
})

Route.post('/gols', async ({ request }) => {
  const data = request.only([
    'data', 'time_casa', 'time_visitante', 'time',
    'jogador', 'minuto', 'contra', 'penalti'])
  return await Gol.create(data)
})

Route.delete('/gols/:id', async ({ params }) => {
  const gol = await Gol.findOrFail(params.id)
  await gol.delete()
  return { deleted: true }
})

Route.put('/gols/:id', async ({ params, request }) => {
  const gol = await Gol.findOrFail(params.id)
  const data = request.only([
    'data', 'time_casa', 'time_visitante', 'time',
    'jogador', 'minuto', 'contra', 'penalti'])
  gol.merge(data)
  await gol.save()
  return gol
})

