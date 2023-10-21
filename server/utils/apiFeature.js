module.exports = class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryString = { ...this.queryString };

    const excludeFileds = ["limit", "page", "fields", "sort"];

    excludeFileds.forEach((el) => {
      delete queryString[el];
    });

    if (queryString) {
      const formattedQueryString = JSON.stringify(queryString).replace(
        /\b(lte|gte|lt|gt)/,
        (matchedVal) => {
          return "$" + matchedVal;
        }
      );

      queryString = JSON.parse(formattedQueryString);

      this.query.find(queryString);
    }

    return this;
  }

  sort() {
    let queryString = { ...this.queryString };

    if (queryString.sort) {
      const sortStr = queryString.sort.replace(/,/g, " ");
      this.query.sort(sortStr);
    } else {
      this.query.sort("createdAt");
    }

    return this;
  }

  paginate() {
    let limit = this.queryString.limit || 10;
    let page = this.queryString.page || 1;

    const skip = limit * (page - 1);

    this.query.skip(skip).limit(limit);
    return this;
  }

  select() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.replace(/,/g, " ");

      this.query.select(fields);
    }

    return this;
  }
};
