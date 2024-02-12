const { ObjectId } = require('mongodb');

const fakeComments = [
    {
        _id: new ObjectId(), // Assuming ObjectId is defined somewhere
        text: "مقاله فوق‌العاده‌ای بود، بسیار مفید بود!",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        date: new Date(Date.now() - 86400000 * 3), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "با برخی نکات مخالفم اما به طور کلی خوب نوشته شده است.",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        date: new Date(Date.now() - 86400000 * 4), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "این تماما دیدگاه من را تغییر داد!",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        date: new Date(Date.now() - 86400000 * 1), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "من این را بسیار مفید یافتم، از به اشتراک گذاری متشکرم!",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        date: new Date(Date.now() - 86400000 * 9), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "آیا می‌توانید در مورد نکته سوم بیشتر توضیح دهید؟",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/women/5.jpg"
        },
        date: new Date(Date.now() - 86400000 * 15), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "خوشحالم که به این برخوردم، واقعا شگفت‌انگیز است.",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        date: new Date(Date.now() - 86400000 * 13), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "مطالب جالبی است، منتظر بیشتر هستم!",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/women/7.jpg"
        },
        date: new Date(Date.now() - 86400000 ), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "این شایسته‌ی بیشتر توجه است، کار عالی است.",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/men/8.jpg"
        },
        date: new Date(Date.now() - 86400000 * 15), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "کاش این را زودتر پیدا کرده بودم، بسیار مفید است.",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/women/9.jpg"
        },
        date: new Date(Date.now() - 86400000 * 2), 
        rate: Math.floor(Math.random() * 10) + 1
    },
    {
        _id: new ObjectId(),
        text: "با شادی منتشر می‌کنم، منتظر نظر دوستانم هستم!",
        author: {
            _id: new ObjectId(),
            profile: "https://randomuser.me/api/portraits/men/10.jpg"
        },
        date: new Date(Date.now() - 86400000 * 7), 
        rate: Math.floor(Math.random() * 10) + 1
    }
];

module.exports = fakeComments