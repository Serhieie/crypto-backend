const createVerifyEmailMarkup = (BASE_URL, verificationCode) => {
  const verifyEmailMarkup = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }

        .container {
            max-width: 600px;
            margin: 20px auto 40px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 20px;
        }

        p {
            color: #666666;
            font-size:18px;
        }

        .button {
            display: block;
            width: 160px;
            font-size: 18px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            text-align: center;
            margin: 30px auto 0px;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #0056b3;
        }

        .text {
            text-align: center;
            font-size: 22px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Email Verification</h1>
        <p>Dear User,</p>
        <p>You have received this email because someone (possibly you) registered on our website.</p>
        <p>To complete the registration process, please click the button below to verify your email address:</p>
        <p><a class="button" target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Verify Email</a></p>
    </div>
     <p class="text" >If you did not register on our website, you can safely ignore this email.</p>
     <p class="text">Thank you!</p>
</body>

</html>
`;
  return verifyEmailMarkup;
};

module.exports = createVerifyEmailMarkup;
