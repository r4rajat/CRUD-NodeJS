const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const User = require('../models/user')

router.get('/users', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch (err){
        return res.status(500).json({
            error: "Error Occurred",
            cause: err.message
        })
    }
})


router.get('/user/:id', async (req, res) => {
    try{
        const users = await User.findById(req.params.id)
        res.json(users)
    }catch (err){
        return res.status(500).json({
            error: "Error Occurred",
            cause: err.message
        })
    }
})


router.post('/user', [
    check('name').isLength({ min: 3}).withMessage('Name should be greater than 3 characters'),
    check('username').isLength({ min: 4}).withMessage('Name should be greater than 4 characters'),
    check('email').isEmail()
],async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: "Error while Validating Request Data",
                cause: errors.array()
            })
        }

        const user = new User(req.body)
        await user.save((err, user) =>
        {
            if (err) {
                return res.status(400).json({
                    error: "Not Able to Save in DB",
                    cause: err.message
                })
            }
            return res.json(user)
        })

    }catch(err){
        return res.status(400).json({
            error: "Error Occurred",
            cause: err.message})
    }

})


router.patch('/user/:id', [
    check('purchased').isBoolean()
],async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: "Error while Validating Request Data",
                cause: errors.array()
            })
        }

        const user = await User.findById(req.params.id)
        user.purchased = req.body.purchased
        await user.save((err, user) => {
            if (err){
                return res.status(400).json({
                    error: "Not Able to Save in DB",
                    cause: err.message
                })
            }
            res.json(user)
        })
    }catch (err){
        return res.status(400).json({
            error: "Error Occurred",
            cause: err.message})
    }
})


router.delete('/user/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        user.sub = req.body.sub
        await user.remove((err, user) => {
            if (err){
                return res.status(400).json({
                    error: "Not Able to Save in DB",
                    cause: err.message
                })
            }
            res.json(user)
        })
    }catch (err){
        return res.status(400).json({
            error: "Error Occurred",
            cause: err.message})
    }
})

module.exports = router

