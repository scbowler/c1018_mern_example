const db = require('../db');
const mysql = require('mysql');

exports.getAll = async (req, res) => {

    const sql = 'SELECT * FROM `students`';

    const students = await db.query(sql);
    
    res.send({
        success: true,
        students: students
    });
}

exports.getOne = async (req, res) => {
    const { student_id } = req.params;
    try {
        if(!student_id){
            throw new Error('No ID provided');
        }
        const sql = 'SELECT * FROM ?? WHERE ??=? LIMIT 1';
        const inserts = ['students', 'id', student_id];

        const formattedSql = mysql.format(sql, inserts);

        const [student] = await db.query(formattedSql);

        if (!student) {
            throw new Error('No student found with provided ID');
        }

        res.send({
            success: true,
            student: student
        });
    } catch(err){
        res.status(422).send('Unable to retrieve student');
    }
}
