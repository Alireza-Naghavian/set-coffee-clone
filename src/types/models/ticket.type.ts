import mongoose from "mongoose";

export type TicketType = {
  _id?: string;
  title: string;
  body: string;
  dept: {
    dept: mongoose.Types.ObjectId;
    title?: string; // for adding populate data in client
  };
  user: {
    _id: mongoose.Types.ObjectId;
  };
  priority: 1 | 2 | 3;
  isOpen: boolean;
  messages:MessagesType[]
};

export type MessagesType = {
  _id?:string
  sender: {
    sender: mongoose.Types.ObjectId;
    ref: string;
  };
  body: string;
  sendAt: Date;
};

export type DepartmentType = {
  title: string;
};
