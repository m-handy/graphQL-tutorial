const jwt = require('jsonwebtoken')
// APP_SECRECT is independent - no connection with secret in Prisma!
const APP_SECRET = 'aw3some'

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}