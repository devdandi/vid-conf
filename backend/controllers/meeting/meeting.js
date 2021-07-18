const { sequelize } = require('../../models/index')
const db = require('../../models/index')
const Meeting = db.meeting
const Invited = db.invited
const User = db.user
const sentInvite = require('../../service/mailer/invite')


exports.create = (async (req, res) => {
    const roomName = req.body.roomName
    const accessCode = req.body.accessCode || 0
    const invited = req.body.invited
    const scheduleDate = req.body.scheduleDate || null
    const hashName = req.body.hashName
    const isUsed = false
    const status = true 
    const user_id = req.body.user_id
    const isSchedule = req.body.isSchedule 

    const meeting = await Meeting.create({
        user_id: user_id,
        isSchedule: isSchedule,
        room_name: roomName,
        hash_name: hashName,
        scheduleDate: scheduleDate,
        isUsed: isUsed,
        passCode: accessCode,
        status: status
    })

    if (invited.length > 0) {
        invited.forEach(async (element) => {
            await Invited.create({
                meeting_id: parseInt(meeting.id),
                email: element
            })
            sentInvite(element, roomName, scheduleDate, hashName)

        })      





    }
    res.send({
        status: "success",
        inviteCode: hashName,
        invitedPerson: invited.length || 0 + " Person"
    })
})

exports.getMeeting = (async (req, res) => {

    const user_id = req.body.user_id 

    const meeting = await Meeting.findAll({
        where: {
            user_id: user_id,
            isUsed: false,
            status: true
        }
    })

    res.send(meeting)
})


exports.findByHash = (async (req, res) => {
    const hash = req.body.hash 

    const data = await Meeting.findAll({
        where: {
            hash_name: hash 
        }
    })
    data[0].isUsed = true 
    data[0].save()

    res.send(data)
})