export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtpHtml(username, otp) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
<tr>
<td align="center" style="padding:40px 15px;">

<table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius:8px;">

<tr>
<td align="center" bgcolor="#2563eb" style="padding:25px;">
<h1 style="margin:0;color:#ffffff;">
Verify Your Email
</h1>
</td>
</tr>

<tr>
<td style="padding:35px;">

<p style="margin:0 0 20px;font-size:16px;color:#333;">
Hi <strong>${username}</strong>,
</p>

<p style="margin:0 0 30px;font-size:15px;color:#555;line-height:24px;">
Use the OTP below to verify your email address.
</p>

<table align="center" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center"
style="
background:#f5f7ff;
border:2px dashed #2563eb;
padding:18px 35px;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
color:#2563eb;
border-radius:8px;
">
${otp}
</td>
</tr>
</table>

<p style="margin-top:30px;font-size:14px;color:#666;text-align:center;">
This OTP will expire in <strong>10 minutes</strong>.
</p>

<p style="margin-top:35px;font-size:14px;color:#666;line-height:22px;">
If you didn't request this code, simply ignore this email.
</p>

<p style="margin-top:30px;font-size:15px;color:#333;">
Thanks,<br>
<b>Your Team</b>
</p>

</td>
</tr>

<tr>
<td align="center" bgcolor="#f8f8f8" style="padding:18px;font-size:12px;color:#999;">
© 2026 Your Company. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}
