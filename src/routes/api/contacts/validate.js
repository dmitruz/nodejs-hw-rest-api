const Joi = require('joi')
const validate = require('../../../helpers/validate')

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .required(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(25).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['ua', 'com', 'net', 'org'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().optional(),
})

module.exports.validationAddContact = ({ body }, _, next) => {
  return validate(schemaAddContact, body, next)
}

module.exports.validationUpdateContact = ({ body }, _, next) => {
  return validate(schemaUpdateContact, body, next)
}
module.exports.validationSetFavoriteContact = ({ body }, _, next) => {
  return validate(schemaUpdateStatusContact, body, next)
}