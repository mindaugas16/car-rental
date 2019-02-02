import {Injectable} from '@angular/core';
import {ApiService} from '../../../api.service';
import {User} from '../../models/user.model';
import {CarModel} from '../../../cars/car.model';
import {CreateRentModel, RentModel, RentUpdateModel} from '../../models/rent.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../../../auth/auth.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private api: ApiService,
              private datePipe: DatePipe) {
  }

  createRent(user: User, car: CarModel, rent: CreateRentModel) {
    const requestBody = {
      query: `
        mutation {
          createRent(rentInput:
          {   user: "${user.userId}",
              car: "${car._id}",
              pickUpLocation: "${rent.pickUpLocation}",
              dropOffLocation: "${rent.dropOffLocation}",
              startDate: "${rent.startDate}",
              endDate: "${rent.endDate}",
              remarks: "${rent.remarks}",
              price: ${rent.price}} ) {
            _id
          }
        }
      `
    };
    return this.api.post(requestBody);
  }

  fetchUserRents() {
    const userId = AuthService.getRealUser().userId;
    const requestBody = {
      query: `
        query {
          rentsByUser(userId: "${userId}") {
            _id,
            user {
              email
            },
            car {
              _id,
              brand,
              model
            },
            pickUpLocation {
              address,
              latitude,
              longitude
            },
            dropOffLocation {
              address,
              latitude,
              longitude
            },
            startDate,
            endDate,
            status,
            remarks,
            price,
            invoice {
              _id,
              createdAt,
              payedAt,
              url
            },
            createdAt,
            updatedAt
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.rentsByUser));
  }

  updateRent(rentId: string, rent: RentUpdateModel) {
    const {status} = rent;

    const requestBody = {
      query: `
      mutation {
          updateRent(rentId:"${rentId}", rentUpdate:{
            status: ${status}
          }) {
            status
        }
       }
      `
    };
    return this.api.post(requestBody);
  }

  fetchAllRents() {
    const requestBody = {
      query: `
        query {
          rents {
            _id,
            user {
              email
            },
            car {
              _id,
              brand,
              model
            },
            pickUpLocation {
              address,
              latitude,
              longitude
            },
            dropOffLocation {
              address,
              latitude,
              longitude
            },
            startDate,
            endDate,
            status,
            remarks,
            price,
            invoice {
              _id,
              createdAt,
              payedAt,
              url
            },
            createdAt,
            updatedAt
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.rents));
  }

  generatePdfSummary(rents: RentModel[]) {
    const docDefinition = this.generateContent(rents);
    pdfMake.createPdf(docDefinition).open();
  }

  private generateContent(rents: RentModel[]) {
    const header = [
      {
        text: 'ID',
        style: 'itemsHeader'
      },
      {
        text: 'Car',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'User',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Pick Up Location',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Drop Off Location',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Status',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Price',
        style: ['itemsHeader', 'center']
      }
    ];
    const items = rents.reduce((acc, item) => {
      acc.push([
        {
          text: item._id.substr(item._id.length - 6),
          style: 'itemTitle'
        }
        ,
        {
          text: `${item.car.brand} ${item.car.model}`,
          style: 'itemTitle'
        },
        {
          text: item.user.email,
          style: 'itemTitle'
        },
        {
          text: item.pickUpLocation.address,
          style: 'itemTitle'
        },
        {
          text: item.dropOffLocation.address,
          style: 'itemTitle'
        },
        {
          text: item.status,
          style: 'itemTitle'
        },
        {
          text: item.price,
          style: 'itemTitle'
        }
      ]);
      return acc;

    }, []);
    return {
      content: [
        {
          text: 'Vartotojų nuomos suvestinė',
          style: 'invoiceTitle',
          width: '*'
        },
        {
          text: this.datePipe.transform(Date.now(), 'medium'),
          style: 'invoiceSubValue',
          width: '*'
        },
        '\n\n\n',
        // Items
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [50, 50, 100, 80, 80, '*', '*'],

            body: [header, ...items]
          }, // table
          //  layout: 'lightHorizontalLines'
        },
        // TOTAL
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: ['*', 80],

            body: [
              // Total
              [
                {
                  text: 'Išviso',
                  style: 'itemsFooterTotalTitle'
                },
                {
                  text: rents.length,
                  style: 'itemsFooterTotalValue'
                }
              ],
            ]
          }, // table
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        // Document Header
        documentHeaderLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'left'
        },
        documentHeaderCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'center'
        },
        documentHeaderRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'right'
        },
        // Document Footer
        documentFooterLeft: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'left'
        },
        documentFooterCenter: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'center'
        },
        documentFooterRight: {
          fontSize: 10,
          margin: [5, 5, 5, 5],
          alignment: 'right'
        },
        // Invoice Title
        invoiceTitle: {
          fontSize: 22,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 15]
        },
        // Invoice Details
        invoiceSubTitle: {
          fontSize: 12,
          alignment: 'right'
        },
        invoiceSubValue: {
          fontSize: 12,
          alignment: 'right'
        },
        // Billing Headers
        invoiceBillingTitle: {
          fontSize: 14,
          bold: true,
          alignment: 'left',
          margin: [0, 20, 0, 5],
        },
        // Billing Details
        invoiceBillingDetails: {
          alignment: 'left'

        },
        invoiceBillingAddressTitle: {
          margin: [0, 7, 0, 3],
          bold: true
        },
        invoiceBillingAddress: {},
        // Items Header
        itemsHeader: {
          margin: [0, 5, 0, 5],
          bold: true
        },
        // Item Title
        itemTitle: {
          bold: true,
        },
        itemSubTitle: {
          italics: true,
          fontSize: 11
        },
        itemNumber: {
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
        itemTotal: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: 'center',
        },

        // Items Footer (Subtotal, Total, Tax, etc)
        itemsFooterSubTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: 'right',
        },
        itemsFooterSubValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: 'center',
        },
        itemsFooterTotalTitle: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: 'right',
        },
        itemsFooterTotalValue: {
          margin: [0, 5, 0, 5],
          bold: true,
          alignment: 'center',
        },
        signaturePlaceholder: {
          margin: [0, 70, 0, 0],
        },
        signatureName: {
          bold: true,
          alignment: 'center',
        },
        signatureJobTitle: {
          italics: true,
          fontSize: 10,
          alignment: 'center',
        },
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10
        },
        center: {
          alignment: 'center',
        },
      },
      defaultStyle: {
        columnGap: 20,
      }
    };
  }
}
