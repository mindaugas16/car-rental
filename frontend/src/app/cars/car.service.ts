import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {map} from 'rxjs/operators';
import {CarModel, CarUpdateInterface} from './car.model';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private api: ApiService,
              private datePipe: DatePipe) {
  }

  fetchCars() {
    const requestBody = {
      query: `
        query {
          cars {
            _id,
            brand,
            model,
            photos,
            description,
            photos,
            mileage,
            color,
            category,
            priceMin,
            productionYear,
            location {
              _id,
              address,
              longitude,
              latitude
            }
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.cars));
  }

  fetchSingleCar(id: string) {
    const requestBody = {
      query: `
        query {
          singleCar(carId: "${id}") {
             _id,
            brand,
            model,
            photos,
            description,
            photos,
            mileage,
            color,
            category,
            priceMin,
            productionYear,
            location {
              _id,
              address,
              longitude,
              latitude
            }
          }
        }
      `
    };
    return this.api.post(requestBody).pipe(map(({data}) => data.singleCar));
  }

  create(car: CarModel) {
    const {brand, model, productionYear, category, priceMin, mileage, description, photos, color} = car;
    const requestBody = {
      query: `
        mutation {
          createCar(carInput: {brand: "${brand}", model: "${model}", productionYear: ${productionYear}, category: ${category},
          priceMin: ${priceMin}, mileage: ${mileage}, color: "${color}", description: "${description}",
          location: "${location || ''}"}) {
           brand
          }
        }
      `
    };
    return this.api.post(requestBody);
  }

  update(carId: string, car: CarUpdateInterface) {
    const {brand, model, productionYear, category, priceMin, mileage, description, photos, color, location} = car;

    const requestBody = {
      query: `
      mutation {
          updateCar(carId:"${carId}", carUpdate:{
            brand: "${brand || ''}", model: "${model || ''}", productionYear: ${productionYear}, category: ${category},
            priceMin: ${priceMin}, mileage: ${mileage}, color: "${color || ''}", description: "${description || ''}",
            location: "${location || ''}"
          }) {
            brand, color
        }
       }
      `
    };
    return this.api.post(requestBody);
  }

  delete(carId: string) {
    const requestBody = {
      query: `
      mutation {
          deleteCar(carId:"${carId}") {
            brand, model
        }
       }
      `
    };
    return this.api.post(requestBody);
  }

  generatePdfSummary(cars: CarModel[]) {
    const docDefinition = this.generateContent(cars);
    pdfMake.createPdf(docDefinition).open();
  }

  private generateContent(cars: CarModel[]) {
    const header = [
      {
        text: 'Brand',
        style: 'itemsHeader'
      },
      {
        text: 'Model',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Category',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Production Year',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Mileage',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Color',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Location',
        style: ['itemsHeader', 'center']
      },
      {
        text: 'Price min',
        style: ['itemsHeader', 'center']
      }
    ];
    const items = cars.reduce((acc, car) => {
      acc.push([
        {
          text: car.brand,
          style: 'itemTitle'
        }
        ,
        {
          text: car.model,
          style: 'itemTitle'
        },
        {
          text: car.category,
          style: 'itemTitle'
        },
        {
          text: car.productionYear,
          style: 'itemTitle'
        },
        {
          text: car.mileage,
          style: 'itemTitle'
        },
        {
          text: car.color,
          style: 'itemTitle'
        },
        {
          text: car.location.address,
          style: 'itemTitle'
        },
        {
          text: car.priceMin,
          style: 'itemTitle'
        }
      ]);
      return acc;

    }, []);
    return {
      content: [
        {
          text: 'Automobilių suvestinė',
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
            widths: [50, 50, 50, 50, '*', '*', 80, '*'],

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
                  text: cars.length,
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
