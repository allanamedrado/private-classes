const fs = require('fs') 
const data = require('./data.json')


exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if (req.body[key] === "") {
            return res.send("Please, fill in all fields!")
        }
    }  

    let {avatar_url, name, birth, edu_level, type_class, area} = req.body

    birth = Date.parse(birth)
    let id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        edu_level,
        type_class,
        area
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

       return res.redirect('/teachers')
    })

}
