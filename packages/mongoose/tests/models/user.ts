import { Schema, model, Document } from 'mongoose'

export default model<Document>('user', new Schema({
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