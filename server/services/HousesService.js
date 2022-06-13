

import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"




class HousesService{
  async getHouses(query = {}){
    return await dbContext.Houses.find(query).populate('creator','name picture')
  }
  async getHouseById(id){
    const house  = await dbContext.Houses.findById(id).populate('creator', 'name picture')
    if(!house){
      throw new BadRequest('Invalid House Id!!')
    }
    return house
  }
  async editHouse(update){
    let original = await this.getHouseById(update.id)
    if(original.creatorId.toString() != update.creatorId){
      throw new Forbidden('You cannot edit a House that you did not post!')
    }

    original.bedrooms = update.bedrooms || original.bedrooms
    original.bathrooms = update.bathrooms || original.bathrooms
    original.levels = update.levels || original.levels
    original.year = update.year || original.year
    original.price = update.price || original.price
    original.imgUrl = update.imgUrl || original.imgUrl
    original.description = update.description || original.description

    await original.save()

    return original
  }

  async createHouse(body){
    const house = await dbContext.Houses.create(body)
    return house
  }

}
export const housesService = new HousesService()