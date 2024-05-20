import express ,{response } from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt, { decode } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const app=express();
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cookieParser());

const db=mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DATABASE
})


app.listen(5000,()=>{
    console.log("Server Listening to port ");
})

  

app.post("/create-checkout-session",async(req,res)=>{
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    if (!stripe) {
        console.error("Failed to initialize Stripe.");
        process.exit(1); // Exit the application if Stripe failed to initialize
    }
    

    try{
        console.log(req.body.products)
        const productdetails =req.body.products;
        if (!Array.isArray(productdetails)) {
            throw new Error("productdetails is not an array");
        }
        const line_items = productdetails.map((item) => {
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name,
                        
                    },
                    unit_amount : item.price*100,
                    

                },
                quantity:1,
            }
        })

       
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items,
            success_url: 'http://localhost:3000/success', // Redirect to this URL after successful payment
            cancel_url: 'http://localhost:3000/cancel',
            

        });
        res.json({ url:session.url });
    }
    catch(error){
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
app.post('/auth', (req, res) => {
    const {
        name,
        email,
        password
   
    } = req.body;

    const values = [
        name,
        email,
        password
    ];

    const sanitizedValues = values.map(val => (val !== undefined ? val : null));

    db.execute(
        'INSERT INTO Auth (name,email,password) VALUES (?, ?, ?)',
        sanitizedValues,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.json({Status:"Success"});
            return res.status(201).send('User Details Added');
            
        }
    );
});
app.post('/login',(req,res)=>{
    const sql='SELECT * FROM Auth where email= ?';
    console.log(req.body.email,"+");
    db.query(sql,[req.body.email],(err,data)=>{
        console.log(data,1);
        if(err) {
            console.log(err)
            return res.json({Error:"Internal Login Error"});
        }
        if(data.length>0){
            
                
                const checkpass=req.body.password;
                const password=data[0].password;
                const compare=checkpass.localeCompare(password);
                console.log(compare)
                if(compare==0){
                    const token = jwt.sign({ email:data[0].email , name:data[0].name}, 'test', { expiresIn: '1h' });
                    const {password ,...others}=data[0];
                    return res
                    
                        .cookie("AccessToken",token,{
                            httpOnly:true,
                            secure:true,
                        })
                        .status(200)
                        .json({success:true,Status:"Success",token });
                }else{
                    return res.json({ success:false,Error: "Password not matched" });
                }
            
        }
        else{
            return res.json({Error:"Email Not Existed"});
        }


    })
});

app.get('/verifyToken', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'test', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.json({ message: 'Token verified' });
    });

    
});
app.get("/singleUser", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    // console.log(decodedToken)
    const sql = 'SELECT * FROM Auth WHERE email = ?';
    db.query(sql, [decodedToken.email], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            res.send(data[0]);
        } else {
            res.status(404).json({ Error: "User Not Found" });
        }
    });
});


app.post('/claimProduct',(req,res)=>{
    const { userId, productId, productType } = req.body;

    if (!userId || !productId || !productType) {
        return res.status(400).send('Missing required fields');
    }
    const sql = 'INSERT INTO claimed_products (user_id, product_id, product_type) VALUES (?, ?, ?)';
    db.query(sql, [userId, productId, productType], (err, result) => {
        if (err) {
            console.error('Error inserting claimed product:', err);
            return res.status(500).send('Server error');
        }
        res
        .status(200)
        .send({ message: 'Product claimed successfully' });
    });
})

app.get('/claimedProducts/:userId', (req, res) => {
    const userId = req.params.userId;

    
    const sql = `
        SELECT 
            p.name AS product_name,
            p.price AS product_price,
            cp.product_type,
            u.name AS user_name,
            u.email AS user_email
        FROM 
            claimed_products cp
        JOIN 
            products p ON cp.product_id = p.id
        JOIN 
            Auth u ON cp.user_id = u.id
        WHERE 
            cp.user_id = ?
    `;

    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Error: "Internal Login Error" });
        }
        if (data.length > 0) {
            res.send(data);
        } else {
            res.status(404).json({ Error: "User Not Found" });
        }
    });
});

