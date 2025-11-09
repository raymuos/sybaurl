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

async function handleLoginUser(req, res) {
    try {
        const { username, password } = req.body;
        const loginUser = await User.findOne({ username, password });

        if (!loginUser) throw new Error("Invalid Username or Password");

        const loginUserRes = loginUser.toJSON();
        res.status(200).json(loginUserRes);

    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

module.exports = {
    handleCreateUser,
    handleLoginUser,
}