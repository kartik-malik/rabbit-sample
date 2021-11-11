const amqp=require("amqplib");
const msg={number:5};
async function connect(){
    try {
        const connection=await amqp.connect("amqp://localhost:5672");
        const channel= await connection.createChannel();
        // const result =await channel.assertQueue("jobs");
       channel.consume("jobs",(message)=>{
           console.log(message);
           const messageItem=JSON.parse(message.content);
           console.log(messageItem.number);
           channel.ack(message);
        //    message.map((item)=>{
        //        console.log(item.content.toString());    
        //    })
       })
       
    }
    catch(err){
       console.log(err);
    }
}
connect();