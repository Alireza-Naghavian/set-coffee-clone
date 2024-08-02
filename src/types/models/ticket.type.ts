import mongoose from "mongoose";

export type TicketType = {
  title: string;
  body: string;
  dept: {
    dept:mongoose.Types.ObjectId,

    
  };
  user:{
    _id:mongoose.Types.ObjectId,
    
  }
  
  priority: 1 | 2 | 3;

};

export type DepartmentType ={
    title:string
}

