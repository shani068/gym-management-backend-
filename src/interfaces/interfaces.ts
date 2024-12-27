import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    refreshToken: string;
}

export interface IMemberShipCategory {
    _id: string;
    name: string;
    description: string;
}

export interface IMemberShip{
    _id: string;
    name: string;
    category: Types.ObjectId;
    period: string;
    amount: number;
    description: string;                                                                    
}

export interface IBase{
    name: string;
    description: string;
}

export interface IStaffMember{
    image: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    role: Types.ObjectId;
    specialization: Types.ObjectId;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
}

export interface IMember extends IStaffMember{
    group: Types.ObjectId;
    weight: number;
    height: number;
    chest: number;
    waist: number;
    thigh: number;
    arms: number;
    fat: number;
    staffMember: Types.ObjectId;
    memberShip: Types.ObjectId;
    memberShipValidFrom: Date;
    memberShipValidTo: Date;
}