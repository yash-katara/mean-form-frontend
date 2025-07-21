import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateUserPDF = (user) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const fileName = `User_${user._id}.pdf`;
    const filePath = path.resolve(`./uploads/${fileName}`);
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(20).text('User Form Data', { align: 'center' });
    doc.moveDown();

    const fields = {
      'Full Name': user.fullName,
      'Email': user.email,
      'Phone': user.phoneNumber,
      'Date of Birth': user.dateOfBirth?.toString().slice(0, 10),
      'Gender': user.gender,
      'Predicted Age': user.age,
      'Address Line 1': user.addressLine1,
      'Address Line 2': user.addressLine2,
      'Country': user.country,
      'State': user.state,
      'City': user.city,
      'Zip Code': user.zipCode,
      'Occupation': user.occupation,
      'Annual Income': user.annualIncome,
    };

    for (let [label, value] of Object.entries(fields)) {
      doc.fontSize(12).text(`${label}: ${value ?? 'N/A'}`);
    }

    doc.moveDown();
    doc.text('Signature:', { underline: true });

    if (user.signature) {
      const base64Data = user.signature.replace(/^data:image\/png;base64,/, '');
      const signaturePath = path.resolve(`./uploads/signature_${user._id}.png`);
      fs.writeFileSync(signaturePath, base64Data, 'base64');
      doc.image(signaturePath, { fit: [150, 100], align: 'left' });
    }

    doc.end();

    writeStream.on('finish', () => resolve(fileName));
    writeStream.on('error', (err) => reject(err));
  });
};
