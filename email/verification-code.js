const verificationCodeTemplate = (displayName, code) => `
<!doctype html>
<html lang="en" style="margin: 0; padding: 0; box-sizing: border-box;">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Welcome to SincereK 3D Prints!</title>
  </head>
  <body style="margin: 0; padding: 0; box-sizing: border-box;">
    <table style="box-sizing: border-box; padding: 0; margin: 0; max-width: 30rem; min-height: 40rem;">
      <tbody style="box-sizing: border-box; padding: 0; margin: 0; max-width: 30rem; min-height: 40rem;"> 
        <tr style="margin: 0; padding: 0; box-sizing: border-box;">
          <td valign="middle" style="margin: 0; padding: 0; box-sizing: border-box;">
            <div class="main" style="box-sizing: border-box; font-family: Oswald, sans-serif; max-width: 30rem; min-height: 40rem; margin: 0; padding: 0; background: url('https://sincerek3dprints.shop/assets/green-dragon.png') no-repeat center center; background-size: cover; border-radius: 1rem; border: 3px solid #d20c29;">
              <div class="filler" style="margin: 0; padding: 0; box-sizing: border-box; height: 25rem;"></div>
              <div class="section" style="margin: 0; box-sizing: border-box; border-radius: 0 0 0.85rem 0.85rem; width: 100%; padding: 2.25rem 2rem 0.5rem; background: rgb(255, 143, 0); background: linear-gradient(180deg, rgba(255, 143, 0, 0) 0%, rgba(0, 0, 31, 0.7) 20%, rgba(0, 0, 31, 0.9) 70%, rgba(0, 0, 31, 1) 100%);">
                <h1 style="padding: 0; box-sizing: border-box; color: #D20C29; margin: 0 0 0.5rem;font-size: 2rem; text-align: center;">Welcome to SincereK 3D Prints!</h1>
                <p style="padding: 0; box-sizing: border-box; color: #f1f1f1; font-size: 1.1rem; margin: 0 0 1rem;text-align: center;">${displayName}, here is your verification code:</p>
                <div class="code" style="padding: 0; box-sizing: border-box; list-style: none; margin: 0 auto; display: block; text-align: center; font-size: 0; letter-spacing: -1em;">
                  <span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(0)}</span><span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(1)}</span><span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(2)}</span><span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(3)}</span><span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(4)}</span><span class="code-bubble" style="box-sizing: border-box; color: #f1f1f1; font-size: 2rem; padding: 0.25rem 0.5rem; border: 2px solid #D20C29; border-radius: 1rem; margin: 0.5rem 0.25rem 0; width: 2.5rem; text-align: center; display: inline-flex; letter-spacing: normal; white-space: nowrap;">${String(code).charAt(5)}</span>
                </div>
                <a href="https://sincerek3dprints.shop" style="box-sizing: border-box; font-size: 1.1rem; display: block; margin: 1.25rem 0 0;text-decoration: none; text-align: center; padding: 0 0 1rem;color: #D20C29;">https://sincerek3dprints.shop</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

module.exports = {
  verificationCodeTemplate
};
