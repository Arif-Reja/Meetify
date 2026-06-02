import mongoose,{Schema} from "mongoose";
const meetingSchema=new Schema({
    user_id:{type:String},
    meetingCode:{type:String,required:true},
    data:{type:Data,default:Data.now,required:true}
});
const Meeting=mongoose.model("Meeting",meetingSchema);
export default {Meeting}