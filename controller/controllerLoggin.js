const a = (req, res) => {
    const formData = req.body

    if (formData.user == "Juan" && formData.pass == "zapa") {
        
        setTimeout(() => {
            console.log(formData)
            res.send({code: 200, body: "succes", redirect: "/admin"})
        }, 5000)

    } else {

        setTimeout(() => {
            res.send({code: 401, body: "ERROR"})
        }, 5000)
    }
}

module.exports = { a }

