
import user from '../models/user.js';


// Create new user
export const createUser = async (req, res) => {
   const { userName, email, password } = req.body;

   // Validate input
   if (!userName || !email || !password) {
       return res.status(400).json({ success: false, message: 'All fields are required.' });
   }

   try {
       // Check if user already exists
       const existingUser = await user.findOne({ email });
       if (existingUser) {
           return res.status(409).json({ success: false, message: 'User already exists.' });
       }

       const newUser = new user({ userName, email, password }); // Make sure to hash the password before saving
       const savedUser = await newUser.save();

       res.status(201).json({ success: true, message: 'Successfully created', data: savedUser });
   } catch (err) {
       console.error('Error saving user:', err);
       res.status(500).json({ success: false, message: 'Failed to create. Try again', error: err.message });
   }
};

//update user
export const updateUser = async(req,res)=>{

   const id = req.params.id
   try {   
      const updatedUser = await user.findByIdAndUpdate(id,{
         $set: req.body
      }, {new: true})
      res.status(200).json({ 
         success: true, 
         message: 'Successfully updated', 
         data: updatedUser,
       });



   } catch (err) {
      res.status(500).json({ 
         success: false, 
         message: 'failed to update', 
       });
   }
};
//delete user
export const deleteUser = async(req,res)=>{
   const id = req.params.id
   try {   
      await user.findByIdAndDelete(id);
      res.status(200).json({ 
         success: true, 
         message: 'Successfully deleted', 
       });

   } catch (err) {
      res.status(500).json({ 
         success: false, 
         message: 'failed to delete', 
       });
   }
};
//getSingle user
export const getSingleUser = async(req,res)=>{
   const id = req.params.id
   try {   
      const user = await user.findById(id);
      res.status(200).json({ 
         success: true, 
         message: 'Successful', 
         data: user,
       });

   } catch (err) {
      res.status(404).json({ 
         success: false, 
         message: 'not found', 
       });
   }
};
//getAll user
export const getAllUser = async(req,res)=>{

   try {   

      const user = await user.find({});

      res.status(200).json({success: true, 
         message: 'Successful', 
         data: user,})

   } catch (err) {
      res.status(404).json({ 
         success: false, 
         message: 'not found', 
       });
   }
};