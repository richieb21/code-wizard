import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'system', 'assistant'] // Assuming these are the roles you have
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ConversationSchema = new Schema({
    title: String,
    messages: [MessageSchema]
})

export default mongoose.model('Conversation', ConversationSchema);