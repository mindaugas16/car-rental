const Invoice = require('../../models/invoice');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const fs = require('fs');

pdfMake.vfs = pdfFonts.pdfMake.vfs;

module.exports = {
    createInvoice: async args => {
        try {
            const docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
            const date = Date.now();
            await pdfMake.createPdf(docDefinition).getBase64((data) => {
                fs.writeFile(`public/invoices/${date}.pdf`, data, {encoding: 'base64'}, function(err) {
                    console.log('File created');
                });
            });
            const invoice = await new Invoice({
                createdAt: args.invoiceInput.createdAt,
                payedAt: args.invoiceInput.payedAt,
                user: args.invoiceInput.user,
                rent: args.invoiceInput.rent,
                url: `/public/invoices/${date}.pdf`
            });

            const result = await location.save();

            return {...result._doc, ...result};
        } catch (err) {
            throw err;
        }
    }
};
