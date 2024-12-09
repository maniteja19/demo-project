import express from 'express'
const app = express();

const port = 3000
app.use(express.json())
app.get('/',(req,res)=>{
    console.log('WELCOME')
})
const teaData = [];
let index=1;
app.post('/tea',(req, res)=>{
    const {name, price}= req.body;
    const tea = {id: index++, name , price};
    teaData.push(tea);
    res.status(201).send(tea);
    
})
app.get('/tea',(req, res)=>{
    res.status(200).send(teaData);
})

app.get('/tea/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("tea not found");
    }
    return res.status(200).send(tea);
})

app.put('/tea/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const tea = teaData.find(t => t.id === id);
    if(!tea){
        return res.status(404).send('tea not found');
    }
    const {name , price} = req.body;
    tea.name = name;
    tea.price = price;
    return res.status(200).send(tea);
})

app.delete('/tea/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const teaIndex = teaData.findIndex(t => t.id === id);
    if(teaIndex === -1){
        return res.status(404).send("tea not found");
    }
    teaData.splice(teaIndex,1)
    return res.status(204).send("tea is deleted")
})
app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})