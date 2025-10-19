import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email service configuration error:', error);
  } else {
    console.log('✅ Email service is ready to send messages');
  }
});

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ServiceFormData {
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  specificQuestions: string;
  preferredTime: string;
  additionalNotes: string;
  serviceName: string;
}

export interface UserWelcomeData {
  name: string | null;
  phone: string;
}

// Email templates
export const createContactEmailTemplate = (data: ContactFormData) => ({
  subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a2332 0%, #0a142f 100%); padding: 30px; border-radius: 10px; color: white;">
        <h2 style="color: #d4af37; margin-bottom: 20px; text-align: center;">
          🌟 New Contact Form Submission
        </h2>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>
        
        ${data.message ? `
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Message</h3>
          <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
          <p style="color: #d4af37; font-size: 14px;">
            Shri Shrree Astro Consultancy Services
          </p>
        </div>
      </div>
    </div>
  `,
  text: `
New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

${data.message ? `Message: ${data.message}` : ''}

---
Shri Shrree Astro Consultancy Services
  `,
});

export const createServiceRequestEmailTemplate = (data: ServiceFormData) => ({
  subject: `New Service Request: ${data.serviceName} from ${data.firstName} ${data.lastName}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a2332 0%, #0a142f 100%); padding: 30px; border-radius: 10px; color: white;">
        <h2 style="color: #d4af37; margin-bottom: 20px; text-align: center;">
          🔮 New Service Request: ${data.serviceName}
        </h2>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Client Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Service Requested:</strong> ${data.serviceName}</p>
        </div>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Birth Details</h3>
          <p><strong>Birth Date:</strong> ${data.birthDate}</p>
          <p><strong>Birth Time:</strong> ${data.birthTime || 'Not specified'}</p>
          <p><strong>Birth Place:</strong> ${data.birthPlace || 'Not specified'}</p>
        </div>
        
        ${data.specificQuestions ? `
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Specific Questions</h3>
          <p style="line-height: 1.6;">${data.specificQuestions.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        ${data.preferredTime ? `
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Preferred Consultation Time</h3>
          <p>${data.preferredTime}</p>
        </div>
        ` : ''}
        
        ${data.additionalNotes ? `
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Additional Notes</h3>
          <p style="line-height: 1.6;">${data.additionalNotes.replace(/\n/g, '<br>')}</p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
          <p style="color: #d4af37; font-size: 14px;">
            Shri Shrree Astro Consultancy Services
          </p>
        </div>
      </div>
    </div>
  `,
  text: `
New Service Request: ${data.serviceName}

Client Information:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service Requested: ${data.serviceName}

Birth Details:
Birth Date: ${data.birthDate}
Birth Time: ${data.birthTime || 'Not specified'}
Birth Place: ${data.birthPlace || 'Not specified'}

${data.specificQuestions ? `Specific Questions: ${data.specificQuestions}` : ''}
${data.preferredTime ? `Preferred Consultation Time: ${data.preferredTime}` : ''}
${data.additionalNotes ? `Additional Notes: ${data.additionalNotes}` : ''}

---
Shri Shrree Astro Consultancy Services
  `,
});

export const createClientConfirmationEmail = (data: ContactFormData | ServiceFormData, type: 'contact' | 'service') => ({
  subject: `Thank you for contacting Shri Shrree Astro Consultancy`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a2332 0%, #0a142f 100%); padding: 30px; border-radius: 10px; color: white;">
        <h2 style="color: #d4af37; margin-bottom: 20px; text-align: center;">
          🌟 Thank You for Your Interest!
        </h2>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${data.firstName},
          </p>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            ${type === 'contact' 
              ? 'Thank you for reaching out to us with your feedback and suggestions. We truly appreciate your interest in Shri Shrree Astro Consultancy.'
              : 'Thank you for your service request. We are excited to help you on your astrological journey.'
            }
          </p>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            Our team will review your ${type === 'contact' ? 'feedback' : 'request'} and get back to you within 24 hours with detailed information and next steps.
          </p>
          <p style="line-height: 1.6;">
            In the meantime, feel free to explore our website for more information about our services and expertise.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
          <p style="color: #d4af37; font-size: 14px; margin-bottom: 10px;">
            Shri Shrree Astro Consultancy Services
          </p>
          <p style="color: #d4af37; font-size: 12px;">
            Phone: +91 7065731251 | Email: thebatraanumerology@gmail.com
          </p>
        </div>
      </div>
    </div>
  `,
  text: `
Thank You for Your Interest!

Dear ${data.firstName},

${type === 'contact' 
  ? 'Thank you for reaching out to us with your feedback and suggestions. We truly appreciate your interest in Shri Shrree Astro Consultancy.'
  : 'Thank you for your service request. We are excited to help you on your astrological journey.'
}

Our team will review your ${type === 'contact' ? 'feedback' : 'request'} and get back to you within 24 hours with detailed information and next steps.

In the meantime, feel free to explore our website for more information about our services and expertise.

---
Shri Shrree Astro Consultancy Services
Phone: +91 7065731251 | Email: thebatraanumerology@gmail.com
  `,
});

export const createWelcomeEmailTemplate = (data: UserWelcomeData) => ({
  subject: `Welcome to Shri Shrree Astro Consultancy - Your Journey Begins!`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #1a2332 0%, #0a142f 100%); padding: 30px; border-radius: 10px; color: white;">
        <h2 style="color: #d4af37; margin-bottom: 20px; text-align: center;">
          🌟 Welcome to Shri Shrree Astro Consultancy! 🌟
        </h2>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${data.name || 'Valued Client'},
          </p>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            Welcome to Shri Shrree Astro Consultancy! We are thrilled to have you join our community of seekers and believers in the cosmic guidance that shapes our destinies.
          </p>
          <p style="line-height: 1.6; margin-bottom: 15px;">
            Your account has been successfully created, and you now have access to our comprehensive range of astrological services designed to illuminate your path forward.
          </p>
        </div>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">What's Next?</h3>
          <ul style="line-height: 1.8; margin-left: 20px;">
            <li>Complete your profile with your birth details for personalized insights</li>
            <li>Explore our range of astrological services</li>
            <li>Book your first consultation with our expert astrologers</li>
            <li>Receive regular cosmic updates and horoscope insights</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d4af37; margin-bottom: 15px;">Our Services Include:</h3>
          <ul style="line-height: 1.8; margin-left: 20px;">
            <li> Birth Chart Analysis</li>
            <li> Horoscope Readings</li>
            <li> Numerology Consultations</li>
            <li> Compatibility Analysis</li>
            <li> Career Guidance</li>
            <li> Relationship Counseling</li>
          </ul>
        </div>
        
        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px;">
          <p style="line-height: 1.6; margin-bottom: 15px; text-align: center; font-weight: bold;">
            Ready to begin your astrological journey?
          </p>
          <p style="line-height: 1.6; text-align: center;">
            Contact us at <strong style="color: #d4af37;">+91 7065731251</strong> or visit our website to book your consultation today!
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
          <p style="color: #d4af37; font-size: 14px; margin-bottom: 10px;">
            Shri Shrree Astro Consultancy Services
          </p>
          <p style="color: #d4af37; font-size: 12px;">
            Phone: +91 7065731251 | Email: thebatraanumerology@gmail.com
          </p>
        </div>
      </div>
    </div>
  `,
  text: `
Welcome to Shri Shrree Astro Consultancy!

Dear ${data.name || 'Valued Client'},

Welcome to Shri Shrree Astro Consultancy! We are thrilled to have you join our community of seekers and believers in the cosmic guidance that shapes our destinies.

Your account has been successfully created, and you now have access to our comprehensive range of astrological services designed to illuminate your path forward.

What's Next?
- Complete your profile with your birth details for personalized insights
- Explore our range of astrological services
- Book your first consultation with our expert astrologers
- Receive regular cosmic updates and horoscope insights

Our Services Include:
- Birth Chart Analysis
- Horoscope Readings
- Numerology Consultations
- Compatibility Analysis
- Career Guidance
- Relationship Counseling

Ready to begin your astrological journey?
Contact us at +91 7065731251 or visit our website to book your consultation today!

---
Shri Shrree Astro Consultancy Services
Phone: +91 7065731251 | Email: thebatraanumerology@gmail.com
  `,
});

// Email sending functions
export const sendContactEmail = async (data: ContactFormData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'thebatraanumerology@gmail.com';
    
    // Send email to admin
    const adminTemplate = createContactEmailTemplate(data);
    await transporter.sendMail({
      from: `"Shri Shrree Astro Consultancy" <${emailConfig.auth.user}>`,
      to: adminEmail,
      ...adminTemplate,
    });
    
    // Send confirmation email to client
    const clientTemplate = createClientConfirmationEmail(data, 'contact');
    await transporter.sendMail({
      from: `"Shri Shrree Astro Consultancy" <${emailConfig.auth.user}>`,
      to: data.email,
      ...clientTemplate,
    });
    
    console.log('✅ Contact emails sent successfully');
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('❌ Error sending contact emails:', error);
    return { success: false, message: 'Failed to send emails', error };
  }
};

export const sendServiceRequestEmail = async (data: ServiceFormData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'thebatraanumerology@gmail.com';
    
    // Send email to admin
    const adminTemplate = createServiceRequestEmailTemplate(data);
    await transporter.sendMail({
      from: `"Shri Shrree Astro Consultancy" <${emailConfig.auth.user}>`,
      to: adminEmail,
      ...adminTemplate,
    });
    
    // Send confirmation email to client
    const clientTemplate = createClientConfirmationEmail(data, 'service');
    await transporter.sendMail({
      from: `"Shri Shrree Astro Consultancy" <${emailConfig.auth.user}>`,
      to: data.email,
      ...clientTemplate,
    });
    
    console.log('✅ Service request emails sent successfully');
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('❌ Error sending service request emails:', error);
    return { success: false, message: 'Failed to send emails', error };
  }
};

export const sendWelcomeEmail = async (data: UserWelcomeData, userEmail: string) => {
  try {
    // Send welcome email to new user
    const welcomeTemplate = createWelcomeEmailTemplate(data);
    await transporter.sendMail({
      from: `"Shri Shrree Astro Consultancy" <${emailConfig.auth.user}>`,
      to: userEmail,
      ...welcomeTemplate,
    });
    
    console.log('✅ Welcome email sent successfully');
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, message: 'Failed to send welcome email', error };
  }
};

export default transporter;
