import { Schema, Document, Model, model } from 'mongoose';

export enum BeachPosition {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export interface Beach {
  _id?: string;
  lat: number;
  lng: number;
  name: string;
  position: BeachPosition;
}

const schema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

interface BeachModel extends Omit<Beach, '_id'>, Document {}

export const Beach: Model<BeachModel> = model('Beach', schema);
