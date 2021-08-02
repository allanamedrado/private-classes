const db = require('../../config/db')
const data = require('../../../data.json')
const { age, graduation, date } = require('../../lib/date')


module.exports = {

    index = function (req, res) {
        return res.render("teachers/teacher", { teachers: data.teachers })
    },

    post = function (req, res) {
        const keys = Object.keys(req.body)

        for (const key of keys) {
            if (req.body[key] === "") {
                return res.send("Please, fill in all fields!")
            }
        }

        const query = `
            INSERT INTO private_classes(
                id,
                avatar_url,
                name,
                birth,
                edu_level,
                type_class,
                area, 
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
       `

       const values = [
           req.body.avatar_url,
           req.body.name,
           date(req.body.birth).iso,
           req.body.edu_level,
           req.body.type_class,
           req.body.area,
           date(Date.now()).iso
       ]

       db.query(query, values, function(err, results) {
        if(err) return res.send("Database Error")

        return res.redirect(`/instructors/${results.rows[0].id}`)
    })
       
},

    show = function (req, res) {
        const { id } = req.params

        const foundTeachers = data.teachers.find(function (teachers) {
            return teachers.id == id
        })

        if (!foundTeachers) return res.send("Teachers not found!")

        const teachers = {
            ...foundTeachers,
            area: foundTeachers.area.split(","),
            birth: age(foundTeachers.birth),
            edu_level: graduation(foundTeachers.edu_level),
            created_at: Intl.DateTimeFormat("pt-br").format(foundTeachers.created_at)
        }

        return res.render('teachers/show', { teachers })

    },

    edit = function (req, res) {
        const { id } = req.params

        const foundTeachers = data.teachers.find(function (teachers) {
            return teachers.id == id
        })

        if (!foundTeachers) return ("Teacher not found! Try again!")

        const teachers = {
            ...foundTeachers,
            birth: date(foundTeachers.birth)
        }

        return res.render('teachers/edit', { teachers: foundTeachers })
    }


}

