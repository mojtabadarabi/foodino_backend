
const { createFood,
    editFood,
    deleteFood,
    deleteUser,
    restaurantApprove,
    createRestaurant,
    editRestaurant,
    deleteRestaurant,
    commentApprove,
    ownCommentApprove } = require('../config/permissions.ts')

const data = [
    {
        name: 'SUPER_ADMIN',
        description: 'website owner',
        permissions: [
            createFood,
            editFood,
            deleteFood,
            deleteUser,
            restaurantApprove,
            createRestaurant,
            editRestaurant,
            deleteRestaurant,
            commentApprove
        ]
    },
    {
        name: 'ADMIN_OPERATOR',
        description: 'operate site',
        permissions: [
            restaurantApprove, 
            createRestaurant,
            editRestaurant,
            deleteRestaurant,
        ]
    },
    {
        name: 'RESTAURANT_ADMIN',
        description: 'restaurant admin',
        permissions: [
            createFood,
            editFood,
            deleteFood,
            ownCommentApprove
        ]
    },
    {
        name: 'USER',
        description: 'user of website',
        permissions: []
    },
]

module.exports = data