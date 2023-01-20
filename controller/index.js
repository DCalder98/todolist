import formidable from "formidable";
import database, { create, get, remove } from "../model/todo";

exports.create = (req, res) =>{
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async(err, fields)=>{
        //Check to see if the description field exists in the form
        //if description doesn't exist, send error
        const {description} = fields;
        if(!fields.description){
            return res.status(404).json({
                error: 'Description is Required',
            });
        } 
        try{
            const newTask = await create(description);
            return res.status(201).send({data: newTask.rows[0]});
        }catch(error){
            return res.status(400).json({
                error,
            });
        }
    })
}

exports.read = async (req, res) =>{
    try{
        const tasks = await get();
        return res.json({
           data: tasks.rows
        });
    }catch (error){
        return res.status(400).json({
            error: error,
        });
    }
}

exports.removeTodo = async (req,res)=>{
    const id = Number(req.params.id)
    try{
        await remove(id);
        return res.status(200).send({data: id});
    }catch (error){
        return res.status(400).json({
            error,
        });
    }
}