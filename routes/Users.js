
var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");


const Vendor = require("../models/Vendor");

const Food = require("../models/Food");
const Order = require("../models/Order");

// GET request 
// Getting all the users
router.get("/namin", function (req, res) {
    const email = localStorage.getItem("uemail");


    Food.findOne(email, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/available", function (req, res) {
    const id=req.body.helo;


    Food.findOne(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            if(users.status==="Hide")
            {
                users.status="Unhide";
                users.save();
            }
            else
            {
                users.status="Hide";
                users.save();
            }
            console.log(users);
            res.json(users);
        }
    })
});



router.post("/getshop", (req, res) => {
    const email = req.body.email;

    console.log(email);
    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            
            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            res.json(user);

        }
    });




});


router.post("/", function (req, res) {
    const email = req.body.email;

    Food.find({ email: email }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.get("/okay", function (req, res) {


    Food.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/lela", function (req, res) {
    const email = req.body.email;

    Order.find({ vemail: email }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/lening", function (req, res) {
    const email = req.body.email;

    Order.find({ vemail: email }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);

        }
    })
});

router.post("/money", function (req, res) {
    const email = req.body.email;

    console.log(email);
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            
            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            console.log(user);
            res.json(user);

        }
    });
});

router.get("/ten", function (req, res) {


    Food.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/jm", function (req, res) {
    const email = req.body.email;

    Order.find({ bemail: email }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/sjac", function (req, res) {
    const email = req.body.email;

    Food.find({ email: email }, function (err, users) {
        if (err) {
            res.send("not there");
        } else {
            res.json(users);
        }
    })
});
// router.get("/Fooditems", function(req, res) {
//     User.find(function(err, Foodie) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(Foodie);
// 		}
// 	})
// });

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db

// router.post("/ur", (req, res) => {
//     let h = 0;
    
    
//     // const newUser = new User({
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //     password: req.body.password,
//     //     contactNumber: req.body.contactNumber,
//     //     age: req.body.age,
//     //     batchName: req.body.batchName,
//     //     wallet: h
//     // });
    
//     // newUser.save()
//     //     .then(user => {
//     //         res.status(200).json(user);
//     //     })
//     //     .catch(err => {
//     //         res.status(400).send(err);
//     //     });
// });
router.post("/ur", (req, res) => {
    const email=req.body.email;
    let h=0;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle database error
        } else if (user) {
            console.log(user);
            res.status(200).json({ message: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                contactNumber: req.body.contactNumber,
                age: req.body.age,
                batchName: req.body.batchName,
                wallet: h
            });
            console.log(newUser);
            newUser.save()
                .then(savedUser => {
                    res.status(200).json(savedUser);
                })
                .catch(saveErr => {
                    res.status(400).send(saveErr);
                });
        }
    });
});




router.post("/placing", (req, res) => {
    const newUser = new Order({
        name: req.body.name,
        vemail: req.body.vemail,
        quantity: req.body.quantity,
        bemail: req.body.bemail,
        price: req.body.price,
        status: req.body.status,
        shopname: req.body.shopname,
        ordertime: req.body.ordertime,
        yes:0,
        ant:0,
    


    });

    newUser.save()
        .then(user => {
            res.send("Order placed");
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post("/vr", (req, res) => {
    const email=req.body.email;
    Vendor.findOne({ email }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err); // Handle database error
        } else if (user) {
            console.log(user);
            res.status(200).json({ message: 'Email already exists' });
        }
        else {
            const newUser = new Vendor({
                name: req.body.name,
                shopname: req.body.shopname,
                password: req.body.password,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                opentime: req.body.opentime,
                closetime: req.body.closetime,
                counter:0
            });
        
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            }
    
});
});



// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    var halo = 0;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendor.findOne({ email }).then(vendor => {
                // Check if vendor email exists
                if (!vendor) {
                    return res.send("Email not found");
                } else {
                    if (password === vendor.password) {
                        res.send("Vendor Logged In");
                    } else {
                        res.send("Passwords didn't match");
                    }
                    return vendor;
                }
            });
        } else {
            if (password === user.password) {
                res.send("Buyer Logged In");
            } else {
                res.send("Passwords didn't match");
            }
            return user;
        }
    });
});



router.post("/getinfo", (req, res) => {
    const email = req.body.emaile;


    var halo = 0;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            res.json(user);

        }
    });




});



router.post("/kummar", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            user.counter=user.counter+1;
            
            user.save();
            res.json(user);

        }
    });




});



router.post("/kummari", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            user.counter=user.counter-1;
            
            user.save();
            res.json(user);

        }
    });




});




router.post("/kummarina", (req, res) => {
    const id = req.body.id;
    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            users.vector=1;
            users.save();
            res.json(users);
        }
    })




});



router.post("/kummarinam", (req, res) => {
    const id = req.body.id;
    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            users.scalar=1;
            users.save();
            res.json(users);
        }
    })




});

router.post("/lcu", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            console.log("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            
            res.send(user);

        }
    });




});


router.post("/tower", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            res.json(user);

        }
    });




});

router.post("/urgn", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            res.send("vendor not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            res.json(user);

        }
    });




});

router.post("/foodgetinfo", (req, res) => {
    const id = req.body.id;
    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })




});

router.post("/vgetinfo", (req, res) => {
    const email = req.body.email;


    var halo = 0;
    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            res.json(user);

        }
    });




});


router.post("/bupdate", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contactNumber = req.body.contactNumber;
    const age = req.body.age;
    const batchName = req.body.batchName;



    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.contactNumber = contactNumber;
            user.age = age;
            user.batchName = batchName;

            user.save();
            res.send("Updated");


        }
    });




});


router.post("/passwordupdate", (req, res) => {
    // const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // const contactNumber = req.body.contactNumber;
    // const age = req.body.age;
    // const batchName = req.body.batchName;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            Vendor.findOne({ email }).then(user2 => {
                // Check if user email exists
                if (!user2) {
                    res.send("Email doesn't exist");
                    // halo=1;
                    // return res.status(404).json({
                    //     error: "Email not found",
                    // });
                } else {
                    user2.email = email;
                    user2.password = password;
                    // user.contactNumber = contactNumber;
                    // user.age = age;
                    // user.batchName = batchName;

                    user2.save();
                    res.send("A mail has been sent to you");
                }
            });
        } else {
            // user.name = name;
            user.email = email;
            user.password = password;
            // user.contactNumber = contactNumber;
            // user.age = age;
            // user.batchName = batchName;

            user.save();
            res.send("A mail has been sent to you");
        }
    });
});



router.post("/machine", (req, res) => {

    const email = req.body.email;
    const money = req.body.dd;




    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {
            user.wallet = user.wallet - money;

            user.save();
            res.send("money deducted");


        }
    });




});

router.post("/macos", (req, res) => {

    const id = req.body.id;
    





    // Find user by email
    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            users.soldcount=users.soldcount+1;
            users.save();
            res.json(users);
        }
    })




});


router.post("/far", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;


    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            res.send("error occured");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {
            user.favs.push(name);


            user.save();
            res.json(user);


        }
    });




});







router.post("/walletism", (req, res) => {
    var wallet = parseInt(req.body.wallet);

    const email = req.body.email;


    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            res.send("error occured");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {

            user.wallet = user.wallet + wallet;

            user.save();
            res.json(user);


        }
    });




});

router.post("/refund", (req, res) => {
    var wallet = req.body.addi;

    const email = req.body.email;


    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            res.send("error occured");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {

            user.wallet = user.wallet + wallet;

            user.save();
            res.json(user);


        }
    });




});

router.post("/tenner", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;


    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            res.send("error occured");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",


            // });
        }
        else {
            res.json(user);


        }
    });




});



router.post("/foodupdate", function (req, res) {
    const id = req.body.id;



    Food.findById(id, function (err, users) {
        if (err) {


            console.log(err);
            res.send("An error occured");
        } else {
            console.log(users);
            users.name = req.body.name;
            users.price = req.body.price;
            users.type = req.body.type;
            users.save();
            res.send("Successfully updated");
        }
    })
});



router.post("/hopes", function (req, res) {
    const id = req.body.id;



    Order.findById(id, function (err, users) {
        if (err) {


            console.log(err);
            res.send("An error occured");
        } else {
            users.yes=1;
            users.save();
            res.send("Successfully updated");
        }
    })
});


router.post("/hopesof", function (req, res) {
    const id = req.body.id;



    Order.findById(id, function (err, users) {
        if (err) {


            console.log(err);
            res.send("An error occured");
        } else {
            users.ant=1;
            users.save();
            res.send("Successfully updated");
        }
    })
});



router.post("/emphasis", function (req, res) {
    const id = req.body.id;



    Order.findById(id, function (err, users) {
        if (err) {


            console.log(err);
            res.send("An error occured");
        } else {
            const email=users.vemail;

            Vendor.findOne({ email}).then(user => {
                // Check if user email exists
                if (!user) {
        
                    res.send("error occured");
        
        
                    //halo=1;
        
                    // return res.status(404).json({
                    // 	error: "Email not found",
        
        
                    // });
                }
                else {
                    var hi;
                    if (users.status === "Placed") {
                        
                        if(user.counter<10){
                            users.status = "Accepted";
                            user.money = user.money + users.quantity*users.price;
                            user.counter=user.counter+1;
                            

                        }
                        else{
                            hi="Busy";

                        }
                    }
                    else if (users.status === "Accepted") {
                        users.status = "Cooked";
                    }
                    else if (users.status === "Cooked") {
                        user.counter=user.counter-1;
                        users.status = "ReadyforPickup";
                    }
                    else if (users.status === "ReadyforPickup") {
                        
                        users.status = "completed";

                    }
                    user.save();
                    users.save();

                    if(hi==="Busy"){
                        res.send("Vendor is busy");

                    }
                    else{
                        const value={
                            check:users.status,
                            message:"Moved to next stage",
                        }
                        res.send(value);

                    }
        
        
                }
            });

           
            
            
            
        }
    })
});

// router.post("/rating",function(req,res){
//     const name1 = req.body.name;
//     const email1 = req.body.email;
//     const rat1 = req.body.rat;
//     Food.findOne({name:name1,email:email1}.then(food=>{
//         if(err){
//             console.log(err);
//             res.send("An error occured");
//         }
//         else{
//             const prevrating = food.rating;
//             const prevorders = food.soldcount;
//             food.rating = Math.floor(((prevrating*prevorders)+rat1)/(prevorders+1));
//             food.soldcount = prevorders+1;
//             food.save();
//             res.send("success");
//         }
//     }))
// });


router.post("/rating", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const rating = req.body.rating;
    const quantity=req.body.quantity;
        console.log(id);
        console.log(email);
        console.log(name);
        console.log(rating);
        console.log(quantity);

        // Next, update the food item's rating and soldcount
        Food.findOne({ email, name }, (err, foodItem) => {
            foodItem.rating = ((rating*quantity) + (foodItem.soldcount * foodItem.rating)) / (foodItem.soldcount + quantity);
            foodItem.soldcount = foodItem.soldcount + quantity;
            foodItem.save((err) => {
                console.log(id);
                Order.findOne({ _id: id }, (err, order) => {
                    order.ratstatus = "true";
                    console.log("hu"+order);
                    order.save()
                    res.status(200).send('Rating updated successfully');
                });
            });
        });
      //  res.status(200).send('Rating updated successfully');
    });




router.post("/emphasiser", function (req, res) {
    const id = req.body.id;



    Order.findById(id, function (err, users) {
        if (err) {


            console.log(err);
            res.send("An error occured");
        } else {
            console.log(users);
            users.status = "Rejected";
            users.save();
            res.send("Order has been rejected");
        }
    })
});

// router.post("/vupdate", (req, res) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const contactNumber = req.body.contactnumber;
//     const opentime = req.body.opentime;
//     const closetime = req.body.closetime;
//     const shopname = req.body.shopname;



//     // Find user by email
//     Vendor.findOne({ email }).then(user => {
//         // Check if user email exists
//         if (!user) {

//             alert("user not exists");


//             //halo=1;

//             // return res.status(404).json({
//             // 	error: "Email not found",
//             // });
//         }
//         else {
//             user.name = name;
//             user.email = email;
//             user.password = password;
//             user.contactnumber = contactNumber;
//             user.shopname = shopname;
//             user.opentime = opentime;
//             user.closetime = closetime;

//             user.save();
//             res.send("Updated");


//         }
//     });




// });


router.post("/vupdate", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contactNumber = req.body.contactnumber;
    const opentime = req.body.opentime;
    const closetime = req.body.closetime;
    const shopname = req.body.shopname;



    // Find user by email
    Vendor.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {

            alert("user not exists");


            //halo=1;

            // return res.status(404).json({
            // 	error: "Email not found",
            // });
        }
        else {
            user.name = name;
            user.email = email;
            user.password = password;
            user.contactnumber = contactNumber;
            user.shopname = shopname;
            user.opentime = opentime;
            user.closetime = closetime;

            user.save();
    
            Food.find({ email }).then(items => {
                if (!items || items.length === 0) {
                    // Handle the case where no items were found
                } else {
                    // Update each item in the array
                    items.forEach(item => {
                        item.opentime = opentime;
                        item.closetime = closetime;
                        item.save()
                            .then(updatedItem => {
                                console.log(item);
                            })
                            .catch(error => {
                                console.log('error while updating the console');
                            });
                    });
                }
            });
            res.send("updated");


        }
    });
    


});



router.post("/addfood", (req, res) => {
    const newfood = new Food({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        email: req.body.email,
        type: req.body.type,
        shopname: req.body.shopname,
        opentime: req.body.opentime,
        closetime: req.body.closetime,
        vendorname: req.body.vendorname,
        soldcount: req.body.soldcount



    });

    console.log(newfood);


    // Find user by email
    newfood.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });



});



router.post("/delfood", (req, res) => {

    const id = req.body.id;

    Food.deleteOne({ "_id": req.body.id })
        .then(user => {
            res.send("Deleted successfully");

        })
        .catch(err => {
            res.status(400).send(err);

        });







    // Find user by email



});



// Find user by email
router.post("/editgetinfo", function (req, res) {
    const id = req.body.id;
    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});













module.exports = router;

