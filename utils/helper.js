const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

// SMS Gateway Details
const user = process.env.SMS_USER;
const password = process.env.SMS_PASS;
const senderId = process.env.SENDER_ID;
const tempid = process.env.TEMP_ID;

async function smsMeNow(phoneno, OTP) {
  var sms = `Dear User, the OTP to login to the call sheets Manager is ${OTP}. OTP's are secret, DO NOT disclose to anyone. Chelsea Solutions`;

  // SMS URL
  const url = `http://sms.smsmenow.in/sendsms.jsp?user=${user}&password=${password}&senderid=${senderId}&mobiles=+91${phoneno}&sms=${sms}&tempid=${tempid}&accusage=1&responsein=json`;
  // send OTP after all the verification.
  const response = await fetch(`${url}`, { method: "GET" });
  const data = await response.json();

  let status = "success",
    reason = "success",
    code = "000";

  if (
    data.smslist.sms.reason === reason &&
    data.smslist.sms.code === code &&
    data.smslist.sms.status === status
  ) {
    return {
      success: true,
      message: `OTP sent to ${phoneno}`,
    };
  } else {
    return { success: false, data };
  }
}

module.exports = { smsMeNow };
