const User = require('../models/user.model');

exports.getUsers = async (req, res) => {
   const users = await User.getAll();
   res.json(users);
};

exports.getUserById = async (req, res) => {
   const id = req.params.id;
   const user = await User.getUserById(id);

   if (!user) {
      return res.status(404).json({ message: 'User not found' });
   }
   res.json(user);
};

exports.createUser = async (req, res) => {
   const id = await User.create(req.body);
   res.status(201).json({ message: 'User created', id });
};

exports.updateUser = async (req, res) => {
   const id = req.params.id;

   const updated = await User.update(id, req.body);
   if (!updated) {
      res.status(404).json(
         { message: 'User not found' }
      );
   }

   res.json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
   const id = req.params.id;
   const deleted = await User.remove(id);

   if (!deleted) {
      res.status(404).json({ message: 'User not found' });
   }

   res.json({ message: 'User deleted' });
}