const paginate = async (model, query = {}, reqQuery = {}) => {
    const page = Math.max(Number(reqQuery.page) || 1, 1);
    const limit = Math.max(Number(reqQuery.limit) || 5, 1);

    const skip = (page - 1) * limit;

    const totalRecords = await model.countDocuments(query);

    const data = await model.find(query)
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