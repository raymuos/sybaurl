const express = require("express");
const User = require("../models/user");

async function handleCreateUser(req, res) {
    try{
        const { email, username, password } = req.body;
        const newUser = await User.create({
            email: email,
            username: username,
            password: password,
        })

        const newUserRes = newUser.toJSON();
        delete newUserRes.password;

        res.status(201).json(newUserRes);
    } catch (err) {
        res.status(400).json({message: err});
    }
}

module.exports = {
    handleCreateUser,
}