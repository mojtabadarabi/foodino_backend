
const { foodManagement,
    userManagement,
    restaurantManagement,
    accessManagement,
    commentManagement } = require('../config/permissions.ts')

const data = [
    {
        name: 'SUPER_ADMIN',
        description: 'website owner',
        permissions: [
            foodManagement,
            userManagement,
            restaurantManagement,
            accessManagement,
            commentManagement
        ]
    },
    {
        name: 'ADMIN',
        description: 'website admin',
        permissions: [
            foodManagement,
            userManagement,
            restaurantManagement,
            commentManagement
        ]
    },
    {
        name: 'RESTAURANT_ADMIN',
        description: 'restaurant admin',
        permissions: [
            foodManagement
        ]
    },
    {
        name: 'USER',
        description: 'user of website',
        permissions: []
    },
]

module.exports = data