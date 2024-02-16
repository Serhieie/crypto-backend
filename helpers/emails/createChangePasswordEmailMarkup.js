const createChangePasswordEmailMarkup = (changePasswordCode) => {
  const verifyEmailMarkup = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
     <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Bebas+Neue&family=Electrolize&family=Iceland&display=swap"
      rel="stylesheet"
    />
    <style>
        body {
            font-family: "Montserrat", sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }

        .container {
            font-family: "Montserrat", sans-serif;
            max-width: 600px;
            margin: 20px auto 40px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-family: "Montserrat", sans-serif;
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
        <h1>Change Password Email</h1>
        <p>Dear User,</p>
        <p>You have received this email because someone (possibly you) trying to change password.</p>
        <p>To complete changing password, please click the button below to change your password:</p>
        <p><a class="button" target="_blank" href="https://serhieie.github.io/Crypto-tutor/changePassword/${changePasswordCode}">Change Password</a></p>
    </div>
     <p class="text" >If you did not try to change password on our website, you can safely ignore this email.</p>
     <p class="text">Thank you!</p>
</body>

</html>
`;
  return verifyEmailMarkup;
};

module.exports = createChangePasswordEmailMarkup;
