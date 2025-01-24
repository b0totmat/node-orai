import { Sequelize } from "sequelize"
const { DataTypes } = Sequelize

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

const Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 4,
            max: 20
        }
    },
    favorite_class: {
        type: DataTypes.STRING,
        defaultValue: 'Computer Science'
    },
    schoolYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    has_language_examination: {
        type: DataTypes.TINYINT,
        defaultValue: false
    }
})

async function getStudentsWithFavoriteClassOrLanguageExam(favoriteClass, hasLanguageExam) {
    try {
        const res = await sequelize.query(`SELECT name FROM Students WHERE favorite_class = '${favoriteClass}' OR has_language_examination = ${hasLanguageExam}`)
        return res
    } catch (e) {
        console.log(e.message)
    }
}

async function getNumberOfStudentsEveryGrade() {
    try {
        const res = await sequelize.query('SELECT schoolYear, COUNT(student_id) AS num_students FROM Students GROUP BY schoolYear')
        return res
    } catch(e) {
        console.log(e.message)
    }
}

(async () => {
    await sequelize.sync({
        force: true
    })
    await Student.bulkCreate([
        {
            name: 'Károly',
            favorite_class: 'History',
            schoolYear: 10,
            has_language_examination: true
        },
        {
            name: 'Liza',
            schoolYear: 9,
            has_language_examination: false
        },
        {
            name: 'Marianna',
            favorite_class: 'English',
            schoolYear: 12
        },
        {
            name: 'János',
            favorite_class: 'Maths',
            schoolYear: 11,
            has_language_examination: true
        },
        {
            name: 'Dóra',
            favorite_class: 'English',
            schoolYear: 13,
            has_language_examination: true
        },
        {
            name: 'Lázár',
            favorite_class: 'Maths',
            schoolYear: 10,
            has_language_examination: false
        }
    ])
    console.log(await getStudentsWithFavoriteClassOrLanguageExam('Computer Science', true))
    console.log(await getNumberOfStudentsEveryGrade())
})()
