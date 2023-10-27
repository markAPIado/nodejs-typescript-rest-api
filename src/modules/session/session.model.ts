import { Model, Schema, Types, model } from 'mongoose';
import { Timestamps } from '../../shared/entities/mongoose/base.interface';
import { USER } from '../user/user.model';
import { SessionMinMaxLength } from './session.constants';

export const SESSION = 'Session';

export interface ISession extends Timestamps {
  user: Types.ObjectId;
  isValid: boolean;
  userAgent: string;
}

type SessionModel = Model<ISession>;

const sessionSchema = new Schema<ISession, SessionModel>(
  {
    user: {
      ref: USER,
      type: Schema.Types.ObjectId
    },
    isValid: {
      default: true,
      type: Boolean
    },
    userAgent: {
      required: true,
      type: String,
      trim: true,
      minlength: SessionMinMaxLength.UserAgentMinLength,
      maxlength: SessionMinMaxLength.UserAgentMaxLength
    }
  },
  {
    timestamps: true
  }
);

const Session = model<ISession, SessionModel>(SESSION, sessionSchema);

export default Session;
