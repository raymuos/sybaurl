const { nanoid } = require("nanoid");
const express = require("express");
const URL = require("../models/url");


async function generateShortId(req, res) {
    const shorterId = nanoid(6);
    if(!req.body.url) return res.status(400).json({error: "url is required"});
    await URL.create({
        shortId: shorterId,
        redirectUrl: req.body.url,
        visitHistory: [] 
    })

    return res.json({shortId: shorterId});
}

async function redirectToUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: { timestamp: Date.now(), },
            }
        }
    )

    res.redirect(entry.redirectUrl);
}

module.exports = {
    generateShortId,
    redirectToUrl,
    
}