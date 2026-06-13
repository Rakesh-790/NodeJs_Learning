const paginate = async (model, query = {}, reqQuery = {}) => {  // model is db name, query is clause like find email basis, reqQuery is page and limit number.

    const page = Math.max(Number(reqQuery.page) || 1, 1);
    const limit = Math.max(Number(reqQuery.limit) || 5, 1);

    const skip = (page - 1) * limit;

    let filter = { ...query };

    if(reqQuery.search){
        filter.title = {
            $regex: reqQuery.search,
            $options: "i"
        };
    };

    const totalRecords = await model.countDocuments(filter);

    const data = await model.find(filter)
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    return {
        data,

        pagination: {
            page,
            limit,
            totalRecords,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    };
};

module.exports = paginate;