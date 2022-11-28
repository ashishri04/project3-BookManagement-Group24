import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type: ObjectId,
            required: true,
            ref: 'Book'
        },
        reviewedBy: {
            type: String,
            required: true,
            default: 'Guest',    // {number, min 1, max 5, mandatory},
            trim: true
        },
        reviewedAt: {
            type: Date,
            required: true
        },

        rating: {
            type: Number,
            required: true,
            minimum: 1,
            maximum: 5
        },

        review: {
            type: String,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)