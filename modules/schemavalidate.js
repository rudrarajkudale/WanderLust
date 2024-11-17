const Joi = require('joi');

const listingSchema = Joi.object({
    listings : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required().min(0), 
        location: Joi.string().required(),
        country: Joi.string().required(),
}).required()
}) 

const reviewSchema = Joi.object({
reviews : Joi.object({
    rating : Joi.number().required().min(1).max(5),
    comment : Joi.string().required()
}).required()
});

module.exports = {listingSchema, reviewSchema } ;
