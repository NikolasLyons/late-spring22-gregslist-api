
import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";



export class HousesController extends BaseController{
  constructor(){
    super('api/houses')
    this.router
    .get('', this.getHouses)
    .get('/:id', this.getHouseById)
    // NOTE checks the credentials of the user insure that they log in
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createHouse)
    .put('/:id', this.editHouse)


  }

  async getHouses(req, res, next){
    try {
      const houses = await housesService.getHouses(req.query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }
  async getHouseById(req , res, next){
    try {
      const house = await housesService.getHouseById(req.params.id)
      return res.send(house)
      
    } catch (error) {
      next(error)
    }

  }

  async createHouse(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
       return res.send(house)
    } catch (error) {
      next(error)
      
    }
  }
  async editHouse(req, res, next){
    try {
      req.body.id = req.params.id
      // NOTE NEVER TRUST THE CLIENT BOYD TO TELL YOU WHO THEY ARE!!!!!!
      req.body.creatorId = req.userInfo.id
      const house = await housesService.editHouse(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }
}