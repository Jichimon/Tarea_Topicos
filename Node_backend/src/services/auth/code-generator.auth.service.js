const Code = require('../../models/register-code.model');


exports.generateCode = async function(userId) {

    const code = generateRandomNumber();
    return await saveCode(code, userId);
}


exports.validateCode = async function(inputCode, userId) {

    const dbCode = await getCodeByUserId(userId);
    if (dbCode.code == inputCode) {
        console.log('code verified!');
        await deleteCode(dbCode.id);
        return true;
    }
    return false;
}



function generateRandomNumber() {
    const code = Math.floor(10000 + Math.random() * 90000);
    console.log('code generated: ' + code);
    return code;
}

async function saveCode(code, userId) {
    var registerCode = await Code.build({
        code: code,
        userId: userId
    });
    await registerCode.save().catch( err => {
        console.log(err);
        return 0;
    });
    console.log('code to user ' + userId + 'saved.');
    return code;
}

async function getCodeById(codeId) {
    return Code.findByPk(codeId);
}

async function getCodeByUserId(userId) {
    return Code.findOne({
        where: {
            userId
        }
    });
}

async function deleteCode(id) {
    Code.destroy({
        where: { id }
    })
    .catch( err => {
        console.log(err);
        return false;
    });

    console.log('code successfully deleted');
    return true;
}