const {buildSchema} = require('graphql');

module.exports = buildSchema(`

type Invoice {
    _id: ID!
    createdAt: String!
    payedAt: String
    user: User!
    rent: Rent!
    url: String
}

type Rent {
    _id: ID!
    user: User!
    car: Car!
    pickUpLocation: Location!
    dropOffLocation: Location!
    startDate: String!
    endDate: String!
    status: Int
    remarks: String
    price: Float
    invoice: Invoice
    updatedAt: String
    createdAt: String
}

input RentInput {
    user: String!
    car: String!
    pickUpLocation: String!
    dropOffLocation: String!
    startDate: String!
    endDate: String!
    remarks: String
    price: Float
}

input RentUpdate {
    status: Int
}

type Location {
    _id: ID!
    address: String!
    latitude: Float!
    longitude: Float!
}

input LocationInput {
    address: String!
    latitude: Float!
    longitude: Float!
}

type Car {
    _id: ID!
    brand: String!
    model: String!
    productionYear: Int!
    photos: [String]
    description: String
    mileage: Float
    color: String
    category: Int
    priceMin: Float
    location: Location
}  

input CarInput {
    brand: String!
    model: String!
    productionYear: Int!
    photos: [String]
    description: String
    mileage: Float
    color: String
    category: Int
    priceMin: Float
    location: String
}

input CarUpdate {
    brand: String
    model: String
    productionYear: Int
    photos: [String]
    description: String
    mileage: Float
    color: String
    category: Int
    priceMin: Float
    location: String
}

type User {
  _id: ID!
  email: String!
  password: String!
  name: String!
  surname: String!
  birthDate: String!
  driverLicenseNumber: Int!
  role: Int!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  email: String!
  role: String!
  name: String
  surname: String
}

input UserInput {
  email: String!
  password: String!
  name: String!
  surname: String!
  birthDate: String!
  driverLicenseNumber: Int!
  role: Int
}

type RootQuery {
    cars: [Car!]!
    singleCar(carId: String!): Car!
    login(email: String!, password: String!): AuthData!
    locations: [Location!]!
    rentsByUser(userId: String!): [Rent!]!
    users: [User!]!
    rents: [Rent!]!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createCar(carInput: CarInput): Car
    updateCar(carId: String!, carUpdate: CarUpdate!): Car
    deleteCar(carId: String!): Car
    createLocation(locationInput: LocationInput): Location
    createRent(rentInput: RentInput): Rent
    updateRent(rentId: String!, rentUpdate: RentUpdate!): Rent
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
