const express = require('express');
const router = express.Router();
const Items = require('../models/items');
const { useNavigate } = require('react-router-dom');
const { default: QRCode } = require('qrcode.react');


router.post('/additem', async (req, res) => {
    console.log("sbsj",req.body);
    try{
    let { name, quantity, date,balance ,qrCodeBase64 } = req.body;
    //  balance = quantity - dispatchQuantity;
    const item = new Items({ name:name,numberReceived:quantity,dateReceived:date,balanceItems:balance, qrCodeUrl:qrCodeBase64 });
    await item.save()
    console.log("Successfully registered",item )
    return res.json({success:true , message: "Successfully registered" });
    // let imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.name}`;
    // console.log("ImageUrl".imageUrl);
    // res.status(201).send('Data and image saved successfully');
    }
    catch(error){
        console.log("Error:",error)
        return res.json({"Fetch Failed :": error})
    }

});


router.post('/getitems', async (req, res) => {
    try {
  
      const items = await Items.find();
  
      if (items.length === 0) {
        return res.status(404).json({ message: "No items found" });
      }
  
      return res.status(200).json({ items, message: "Successfully fetched" });
    } catch (error) {
      console.error("Error fetching items:", error);
      return res.status(500).json({ message: "An error occurred while fetching items" });
    }
  });
  

  router.put('/editItem/:id', async (req, res) => {
    try {
      const itemId = req.params.id; // Extract the item ID from the path parameters
      const { name,numberReceived, numberDispatched, dateDispatch,} = req.body; // Destructure the body for the required fields

  
      const balanceItems = numberReceived-numberDispatched;
      
      const status = numberDispatched>0?"deliverd":"pending";

      // Validate the input data
      if (!itemId) {
        return res.status(400).json({ message: "Item ID is required" });
      }
      // Find the item by its ID and update it
      const updatedItem = await Items.findByIdAndUpdate(
        itemId,
        { name, numberDispatched, dateDispatch,balanceItems,status },
        { new: true, runValidators: true } // `new: true` returns the updated document
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
  
      // Return the updated item and a success message
      return res.status(200).json({ item: updatedItem, message: "Item successfully updated" });
    } catch (error) {
      console.error("Error updating item:", error);
      return res.status(500).json({ message: "An error occurred while updating the item" });
    }
  });
  

  router.delete('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
  
      // Find item by ID and delete it
      const deletedItem = await Items.findByIdAndDelete(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      return res.status(200).json({ message: 'Item successfully deleted' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ message: 'An error occurred while deleting the item' });
    }
  });


  router.post('/updateitem', async(req,res)=>{
  // console.log("aaya hua data :",req.body.)
    try {
      const qrCodeUrl = req.body.imageUrl;
      const imgUrl = await Items.findOne({ qrCodeUrl: qrCodeUrl });
      console.log("imgUrl is : ",imgUrl)
      
      if(imgUrl){
        const numberDispatched = imgUrl.numberDispatched +1;
        const dateDispatch = new Date();
        const balanceItems = imgUrl.balanceItems - 1;
        const status = 'delivered';
        const update = await Items.findOneAndUpdate(
          imgUrl._id,
          {numberDispatched, dateDispatch,balanceItems,status },
          { new: true, runValidators: true }
        )
        if(!update){
          res.status(500).json({message:"Not saved"})
        }
      }
      console.log("running")
      res.status(200).json({message:"successful working"})
    } catch (error) {
      console.log("not saved")
      res.status(500).json({message:"Image not present"})
    }
  })

module.exports = router;