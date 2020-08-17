const fs = require('fs') 
const data = require('./data.json')
const { age, graduation, date } = require('./date')

exports.index = function(req, res){
   return res.render("teachers/teacher", { teachers: data.teachers } )
}

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
    let created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        edu_level,
        type_class,
        area,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

       return res.redirect('/teachers')
    })

}

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teachers){
       return teachers.id == id
    })

    if ( !foundTeachers) return res.send("Teachers not found!")
    
    const teachers = {
        ...foundTeachers,
        area: foundTeachers.area.split(","),
        birth: age(foundTeachers.birth),
        edu_level: graduation(foundTeachers.edu_level),
        created_at: Intl.DateTimeFormat("pt-br").format(foundTeachers.created_at)
    }

    return res.render('teachers/show', { teachers })
    
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teachers) {
        return teachers.id == id
    })

    if(!foundTeachers) return ("Teacher not found! Try again!")

    const teachers = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
    }

    return res.render('teachers/edit', { teachers: foundTeachers })
}

