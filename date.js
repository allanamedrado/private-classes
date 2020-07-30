module.exports = {
//2020 - 1997 = 23
//07 - 12 = - 5
// 29 - 30 = - 1

age: function age(birth) {
    const today = new Date()
    const birthDay = new Date(birth)
    
    let age = today.getUTCFullYear() - birthDay.getUTCFullYear()

    const month = today.getUTCMonth() - birthDay.getUTCMonth()

    if( month < 0 || month == 0 && today.getUTCDate() < birthDay.getUTCDate()) {
        age = age - 1
    }

    return age
},

graduation: function graduation(area) {
    if(area== "Master's degree") {
        return "Master's"
    } else if (area == "Complete HS") {
        return "High School"
    } else if (area == "Complete College") {
        return "College"
    } else {
        return "Doctorate"
    }
},

date: function date(birth) {
    const date = new Date(birth)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth()}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
}

}