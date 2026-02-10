const Resend = require('resend');

const resend = new Resend.Resend('re_fMtsRyn3_BvvG5a3Cno2KtfJFBGxTqzqV');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, slug, recipientName } = req.body;

    const pageUrl = `https://willubewith.me/${slug}`;

    const { data, error } = await resend.emails.send({
      from: 'Will U Be With Me 💕 <support@willubewith.me>',
      to: email,
      subject: '💕 Your page is ready! - Will U Be With Me',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#1a1a2e;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:30px;">
              <h1 style="color:#ff69b4;font-size:28px;margin:0;">Will U Be With Me 💕</h1>
            </div>
            
            <div style="background:linear-gradient(135deg,#2a2a4e,#1a1a2e);border-radius:20px;padding:40px;text-align:center;border:1px solid rgba(255,105,180,0.3);">
              <div style="font-size:50px;margin-bottom:20px;">🎉</div>
              <h2 style="color:#fff;font-size:24px;margin:0 0 15px;">Your page is ready!</h2>
              <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.6;margin:0 0 30px;">
                Your personalized page for <strong style="color:#ff69b4;">${recipientName || 'your special someone'}</strong> has been created successfully!
              </p>
              
              <div style="background:rgba(255,105,180,0.1);border-radius:15px;padding:20px;margin-bottom:30px;">
                <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0 0 10px;">Your personalized link:</p>
                <a href="${pageUrl}" style="color:#ff69b4;font-size:18px;font-weight:bold;text-decoration:none;">${pageUrl}</a>
              </div>
              
              <a href="${pageUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff69b4,#ff1493);color:#fff;padding:15px 40px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:16px;">
                View Your Page 💕
              </a>
            </div>
            
            <div style="text-align:center;margin-top:30px;">
              <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 10px;">
                Share this link with your special someone and wait for their answer! 🤞
              </p>
              <p style="color:rgba(255,255,255,0.3);font-size:12px;margin:0;">
                © 2024 RamsesVibes - Made with 💕 in Marseille
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
};
