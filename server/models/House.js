import mongoose from "mongoose"
const Schema = mongoose.Schema




export const HouseSchema = new Schema({
  bedrooms: {type: Number, required: true},
  bathrooms:{type: Number, required: true},
  levels:{type: Number, default: 0},
  price: {type: Number, required: true, min:100000},
  year: {type: Number, required: true, min: 1920, max: new Date().getFullYear()},
  description: {type: String, default:'There is no description about the house' },
  imgUrl: {type: String, default:'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account'}
}, {timestamps: true, toJSON:{virtuals: true}})

HouseSchema.virtual('creator',{
  localField: 'creatorId',
  ref:'Account',
  foreignField: '_id',
  justOne: true
})