const User = require("../models/user");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const Role = require("../models/role");
const SubRole = require("../models/subRole");
const jwt_decode = require("jwt-decode");
const { smsMeNow } = require("../utils/helper");
dotenv.config();

//signup email activation
exports.sendVerificationEmail = async (req, res) => {
  try {
    const { email, id } = req.body;

    const htmlText1 = `
      <!DOCTYPE html>
  
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
  <title></title>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          th.column {
              padding: 0
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          @media (max-width:660px) {
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
          }
      </style>
  </head>
  <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1A1141EF;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="empty_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div></div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="20" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:12px;padding-top:60px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-left:40px;padding-right:40px;width:100%;">
  <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://i.ibb.co/ChyfP9p/logo.png" style="display: block; height: auto; border: 0; width: 352px; max-width: 100%;" title="I'm an image" width="352"/></div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-top:50px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #e6d4d4; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
  <p style="margin: 0; font-size: 16px; text-align: center;"><span style="font-size:30px;color:#ffffff;"><strong>Activate your account</strong></span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
  <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Please click on below button to activate your account.</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-top:50px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="button_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-left:10px;padding-right:10px;padding-top:40px;text-align:center;">
  <div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:62px;width:164px;v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#1a1141"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
  <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#1a1141;border-radius:60px;width:auto;border-top:1px solid #1a1141;border-right:1px solid #1a1141;border-bottom:1px solid #1a1141;border-left:1px solid #1a1141;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><a href="${CLIENT_URL}/authentication/activate/${id}" target="_blank" style="font-size: 16px; margin: 0; text-decoration: none; color: white; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>Activate Now</strong></a></span></div>
  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:12px;padding-top:60px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="20" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1a1141;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
  <p style="margin: 0; font-size: 14px; text-align: left;"><span style="color:#ffffff;">You are receiving this email, because you agreed to our terms & conditions and privacy policies.</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
  <p style="margin: 0; font-size: 14px; text-align: left;"><span style="color:#95979c;font-size:12px;">HG PORTAL Copyright © 2021</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center;">
  <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="text-align:center;">
  <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
  <!--[if !vml]><!-->
  <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
  <!--<![endif]-->
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table><!-- End -->
  </body>
  </html>
      `;

    //mail options
    let mailOpt = {
      from: {
        email: SENDGRID_SENDER,
        name: "Call Sheet",
      }, // sender address
      to: email, // list of receivers
      subject: "Call Sheet : Account Activation", // Subject line
      html: htmlText1, // html body
    };

    //sending mail
    sgMail
      .send(mailOpt)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Mail has been sent, please activate your account",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

//login email verification

exports.email2faVerification = async (req, res) => {
  try {
    const { email, code } = req.body;

    const htmlText1 = `
      <!DOCTYPE html>
  
  <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
  <head>
  <title></title>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
  <style>
          * {
              box-sizing: border-box;
          }
  
          body {
              margin: 0;
              padding: 0;
          }
  
          th.column {
              padding: 0
          }
  
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
          }
  
          #MessageViewBody a {
              color: inherit;
              text-decoration: none;
          }
  
          p {
              line-height: inherit
          }
  
          @media (max-width:660px) {
              .icons-inner {
                  text-align: center;
              }
  
              .icons-inner td {
                  margin: 0 auto;
              }
  
              .row-content {
                  width: 100% !important;
              }
  
              .stack .column {
                  width: 100%;
                  display: block;
              }
          }
      </style>
  </head>
  <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
  <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1a1141;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="empty_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div></div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="20" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:12px;padding-top:60px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="image_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-left:40px;padding-right:40px;width:100%;">
  <div align="center" style="line-height:10px"><img alt="I'm an image" src="https://i.ibb.co/ChyfP9p/logo.png" style="display: block; height: auto; border: 0; width: 352px; max-width: 100%;" title="I'm an image" width="352"/></div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-top:50px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
  <p style="margin: 0; font-size: 16px; text-align: center;"><span style="font-size:30px;color:#ffffff;"><strong>2FA Email Authentication</strong></span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
  <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 22.5px;"><span style="color:#808389;font-size:15px;">Please enter the following code from where you started creating your account.</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-top:50px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #bad1ff; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="width:30px;background-color:#FFFFFF"> </td>
  <td style="padding-top:0px;padding-bottom:0px;border-top:0px;border-bottom:0px;width:580px;">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1a1141;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-top:25px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
  <p style="margin: 0; font-size: 16px; text-align: center;"><span style="color:#2b303a;font-size:18px;"><strong>Use this Code</strong></span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:32px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;">
  <p style="margin: 0; font-size: 16px; text-align: center;"><span style="color:#747196;font-size:38px;"><span style=""><strong>${code}</strong></span></span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  </td>
  <td style="width:30px;background-color:#FFFFFF"> </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:12px;padding-top:60px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="20" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #1a1141; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td>
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px solid #1a1141;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:15px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px; color: #555555; line-height: 1.5;">
  <p style="margin: 0; font-size: 14px; text-align: left;"><span style="color:#ffffff;">You are receiving this email, because you agreed to our terms &amp; conditions and privacy policies.</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="divider_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
  <div align="center">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #555961;"><span> </span></td>
  </tr>
  </table>
  </div>
  </td>
  </tr>
  </table>
  <table border="0" cellpadding="0" cellspacing="0" class="text_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
  <tr>
  <td style="padding-bottom:30px;padding-left:40px;padding-right:40px;padding-top:20px;">
  <div style="font-family: sans-serif">
  <div style="font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2;">
  <p style="margin: 0; font-size: 14px; text-align: left;"><span style="color:#95979c;font-size:12px;">HG PORTAL Copyright © 2021</span></p>
  </div>
  </div>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tbody>
  <tr>
  <td>
  <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000;" width="640">
  <tbody>
  <tr>
  <th class="column" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
  <table border="0" cellpadding="0" cellspacing="0" class="icons_block" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center;">
  <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
  <tr>
  <td style="text-align:center;">
  <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
  <!--[if !vml]><!-->
  <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
  <!--<![endif]-->
  </table>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </th>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table><!-- End -->
  </body>
  </html>
      `;

    //mail options
    let mailOpt = {
      from: {
        email: SENDGRID_SENDER,
        name: "Call Sheet",
      }, //sender's email
      to: email, // list of receivers
      subject: "Call Sheet : Account Verification", // Subject line
      html: htmlText1, // html body
    };

    //sending mail
    sgMail
      .send(mailOpt)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Mail has been sent, please verify your account",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Register user through phoneno **********

exports.registerUserByPhoneno = async (req, res) => {
  try {
    const { phoneno } = req.body;

    const user = await User.findOne({ phoneno });
    if (user)
      return res.status(400).json({
        success: false,
        error: "User with this phoneno already exists",
      });

    // Generate OTP
    const generateRandomNumber = () => {
      var minm = 100000;
      var maxm = 999999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    };

    const OTP = generateRandomNumber();

    // SMS Gateway Details
    const userName = process.env.SMS_USER;
    const password = process.env.SMS_PASS;
    const senderId = process.env.SENDER_ID;
    const tempid = process.env.TEMP_ID;

    var sms = `Dear User, the OTP to login to the call sheets Manager is ${OTP}. OTP's are secret, DO NOT disclose to anyone. Chelsea Solutions`;

    // SMS URL
    const url = `http://sms.smsmenow.in/sendsms.jsp?user=${userName}&password=${password}&senderid=${senderId}&mobiles=+91${phoneno}&sms=${sms}&tempid=${tempid}&accusage=1&responsein=json`;

    // Send OTP
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    let status = "success",
      reason = "success",
      code = "000";

    if (
      data.smslist.sms.reason === reason &&
      data.smslist.sms.code === code &&
      data.smslist.sms.status === status
    ) {
      let user = new User({
        phoneno: phoneno,
        code: OTP
      })
      await user.save()
      return res.status(200).json({
        status: "success",
        message: `OTP sent to ${phoneno}`,
        OTP,
      });
    } else {
      return res.status(400).json({ data });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

exports.registrationVerificationByPhone = async (req, res) => {
  try {
    const { phoneno, code, name, email, dob, aboutyou, role, subRole, gender, username } = req.body;

    const user = await User.findOne({ phoneno });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const usernameCheck = await User.findOne({ username: username });

    if(usernameCheck && username!==undefined) {
      return res.status(404).json({
        success: false,
        error: "User name already exists.",
      });
    }

    let codes = {
      userCode: user.code,
      code: code
    }

    if (user.code !== code) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
        codes
      });
    }

    const roles = await Role.findOne({ name: role });
    const subRoles = await SubRole.findOne({ name: subRole });

    if (!roles) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (!subRoles && role!=="admin") {
      return res.status(404).json({ error: "SubRole not found" });
    }

    // Save User Data
    user.name = name;
    user.email = email;
    user.dob = dob;
    user.aboutyou = aboutyou;
    user.role = roles._id;
    if(role!=="admin") {
      user.subRole = subRoles._id;
    }
    user.gender = gender;
    user.code = null;
    user.username = username;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User data saved successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// add password after register user

exports.addPassword = async (req, res) => {
  const { email, phoneno, password } = req.body;
  try {
    var user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneno) {
      user = await User.findOne({ phoneno });
    } else {
      return res.status(400).json({
        success: false,
        error: "Email or phoneno not found",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }
    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.status = "active";
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password added",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// login user

exports.loginEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials, Please Check",
      });
    }
    const token = jwt.sign(
      {
        id: oldUser._id,
        email: oldUser.email,
      },
      process.env.JWT_ACTIVATION,
      {
        expiresIn: "1h",
      }
    );

    let codes = Math.floor(1000 + Math.random() * 9000);
    const htmlText = `
    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
        @media screen {
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
            }
  
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
            }
  
            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 400;
                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
            }
  
            @font-face {
                font-family: 'Lato';
                font-style: italic;
                font-weight: 700;
                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
            }
        }
  
        /* CLIENT-SPECIFIC STYLES */
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
  
        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
  
        img {
            -ms-interpolation-mode: bicubic;
        }
  
        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
  
        table {
            border-collapse: collapse !important;
        }
  
        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }
  
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
  
        /* MOBILE STYLES */
        @media screen and (max-width:600px) {
            h1 {
                font-size: 32px !important;
                line-height: 32px !important;
            }
        }
  
        /* ANDROID CENTER FIX */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
  </head>
  
  <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#1A1141EF" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#1A1141EF" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#1A1141EF"><h2 style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">${codes}</h2></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Cheers,<br>HG Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
  </body>
          
                  `;
    let mailOpt = {
      from: SENDGRID_SENDER, // sender address
      to: email, // list of receivers
      subject: "Call Sheet : Login Verification", // Subject line
      html: htmlText, // html body
    };

    //sending mail

    sgMail
      .send(mailOpt)
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Mail has been sent, Please verify your account",
          result: oldUser,
          token,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err,
        });
      });
    // await transporter.sendMail(mailOpt, (err, info) => {
    //   if (err) {
    //     res.status(400).json({
    //       success: false,
    //       error: `${JSON.stringify(err)}`,
    //     });
    //   } else {

    //   res.status(200).json({
    //     success: true,
    //     message: "Mail has been sent, Please verify your account",
    //     result: oldUser,
    //     token,
    //   });
    // }
    // });
    oldUser.code = codes;
    await oldUser.save();
  } catch (err) {
    res.status(500).json({
      succcess: false,
      message: "Something went wrong",
    });
  }
};

// login with phoneno

exports.loginPhoneno = async (req, res) => {
  const { phoneno } = req.body;
  try {
    const oldUser = await User.findOne({ phoneno: phoneno });

    if (!oldUser) {
      return res.status(400).json({
        success: false,
        message: "Phone number not registered. Please enter a valid phone number.",
      });
    }

    if(oldUser.status!=="active") {
      return res.status(400).json({
        success: false,
        message: `User is ${oldUser.status}`,
      });
    }

    // generate random 6 digit numbers for SMS

    let code = Math.floor(100000 + Math.random() * 900000);
    let response = await smsMeNow(oldUser.phoneno, code);

    if (response.data) {
      return res.status(400).json({ data: response.data });
    } else {
      oldUser.code = code;
      await oldUser.save();

      return res.status(200).json({
        status: "success",
        message: `OTP sent to ${phoneno}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      succcess: false,
      message: "Something went wrong",
      reason: err.message,
    });
  }
};

exports.decodeVerificationToken = async (req, res) => {
  const { email, phoneno, code } = req.body;
  try {
    if (!code) {
      return res.status(404).json({
        success: false,
        error: "Code not found!",
      });
    } else {
      var codeverify;
      if (email) {
        codeverify = await User.findOne({ email, code })
          .populate("role")
          .populate("subRole");
        // if (!codeverify) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Invalid code",
        //   });
        // } else {
          const token = jwt.sign(
            {
              id: codeverify._id,
              phoneno: codeverify.phoneno,
            },
            process.env.JWT_ACTIVATION,
            {
              expiresIn: "1h",
            }
          );
          // codeverify.accessToken = token;
          // await codeverify.save();
          // const { password, code, ...userWithoutPassword } = codeverify._doc;
          return res.status(200).json({
            success: true,
            message: "User verified",
            // user: userWithoutPassword._doc,
            accessToken: token,
          });
        // }
      } else if (phoneno) {
        codeverify = await User.findOne({ phoneno })
          .populate("role")
          .populate("subRole");
        if (!codeverify) {
          return res.status(400).json({
            success: false,
            message: "Invalid code",
          });
        } else {

          const token = jwt.sign(
            {
              id: codeverify._id,
              phoneno: codeverify.phoneno,
            },
            process.env.JWT_ACTIVATION,
            {
              algorithm: 'HS256',
              expiresIn: '1d' }
          );

          const refreshToken = jwt.sign(
            {
              id: codeverify._id,
              phoneno: codeverify.phoneno,
            },
            process.env.JWT_ACTIVATION,
            {
              algorithm: 'HS256',
              expiresIn: '7d' }
          );
          codeverify.accessToken = token;
          await codeverify.save();
          const { password, code, ...userWithoutPassword } = codeverify._doc;

          return res.status(200).json({
            success: true,
            message: "User verified",
            userId: codeverify._doc._id,
            accessToken: token,
            refreshToken: refreshToken
          });
        }
      } else {
        return res.status(404).json({
          message: "Email or phoneno is required",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const {refreshToken, phone, userId} = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is missing.' });
    }

    var accessToken = null

    jwt.verify(refreshToken, process.env.JWT_ACTIVATION, { algorithm: 'HS256' }, (err, decoded) => {
      if (err) {
        console.log("err", err);
        return res
          .status(401)
          .json({ auth: false, message: "Failed to authenticate token." });
      }
      else {
        accessToken = jwt.sign({ id: decoded.id, phoneno: decoded.phoneno }, process.env.JWT_ACTIVATION, { expiresIn: '1d' });
      }
    });
  
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    var bearerHearder = await req.headers["authorization"];

    const bearer = bearerHearder.split(" ");

    const bearerToken = bearer[1];

    const decode = jwt_decode(bearerToken);

    const id = decode.id;
    let user = await User.findById(id);
    user.accessToken = "";
    await user.save();
    return res.send({ success: true, message: "User Logged out" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
