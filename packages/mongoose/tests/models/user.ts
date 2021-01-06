import { Schema, model } from 'mongoose'

export default model('user', new Schema({
  id: {
    type: Number,
    default: 0,
    index: { unique: true }
  },
  username: {
    type: String,
    required: true
  }
}))