const foods = require('./Restaurants.json');

export const createSeed=async(userName:String,data:any)=>{
    const restaurant = await RestaurantModel.findOne({ adminUserName: userName })
    restaurant.menu = data
    await restaurant.save()
}

export const seed=()=>{
    const menu=[
        {
            userName:'mojtaba',
            foods:foods.slice(0,10)
        },
        {
            userName:'mojtaba2',
            foods:foods.slice(10,15)
        },
        {
            userName:'mojtaba3',
            foods:foods.slice(15,22)
        }
    ]
    menu.map(({userName,foods})=>{
        createSeed(userName,foods)
    })
}