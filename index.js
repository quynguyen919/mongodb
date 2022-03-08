const express = require('express');
const app = express();
const { connect } = require('./services/database');
const itemModel = require('./models/item.model');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/items', async (req, res)=>{
    try {
        let items = await itemModel.find();
        res.send(items);
    } catch (error) {
        console.log(error);
    }
})

app.post('/addItem', async (req, res)=>{
    try {
        let body = req.body;

        let item = new itemModel(body)

        item.save().then((value)=>{
            res.status(201).send({
                message: "Thêm thành công rồi !!!",
                data: item
            })
        })
    } catch (error) {
        console.log(error);
    }
})

app.delete('/item', async (req, res)=>{
    try {
        let _id = req.body.id;

        let result = await itemModel.findByIdAndDelete(_id);

        if(result == null){
            res.status(400).send({
                message: `Tìm không được id ${_id} này!!!`
            })
        }else{
            res.status(200).send({
                message: "Xoa thanh cong!!!"
            })
        }

    } catch (error) {
        console.log(error);
    }
})

app.get('/item', async (req, res)=>{
    try {
        let _id = req.query.id;

        let item = await itemModel.findById(_id);

        res.status(200).send({
            message: "Tìm được rồi!",
            data: item
        })

    } catch (error) {
        console.log(error);
    }
})


app.listen(3000, async()=>{
    await connect();
    console.log(`Server is running on PORT ${3000}`);
})
