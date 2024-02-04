import { Http } from "./enums";

export interface iError {
  name: string;
  message: string;
  status: Http;
  success: boolean;
}

export interface iUser {
  email: string;
  password: string;
  token: string;
  verify: boolean;
  status: string;
  schoolCode: string;
}

export interface iUserData extends iUser, Document {}

export interface iVoice {
  name: string;
  avatar: string;
  email: string[];
  status: string;
  verify: boolean;
}

export interface iVoiceData extends iVoice, Document {}
