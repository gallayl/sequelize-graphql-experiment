# sequelize-graphql-experiment

## To get it work

1. clone
1. install dependencies with yarn / npm
1. hit `yarn start` or `npm run start`
1. ultimate satisfaction, fame, beer and money

## Examples to try out

### Get the users with their line managers 2 level deep

```gql
{
  getUsers {
    id
    userName
    lineManager {
      userName
      lineManager {
        userName
      }
    }
  }
}
```

### Get a brand and its related product, including their creators / last modifiers

```gql
{
  getBrands {
    name
    createdBy {
      userName
    }
    products {
      name
      createdBy {
        userName
      }
      modifiedBy {
        userName
      }
    }
  }
}
```

### What's not covered (and probably needs to be implemented)

- Filters
- Ordering
